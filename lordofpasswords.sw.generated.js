/* eslint-disable no-restricted-globals, no-console */

console.log('Build date: Fri 29 Jul 2022 22:07:07 CEST')

const appScope = self.registration.scope

const cacheName = `${appScope}@1.0.0-beta.2`

const FILES_TO_CACHE = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './style.css',
  './images/key-512.svg',
  './images/key-512.png',
  './images/favicon-32x32.png',
  './images/favicon-96x96.png',
  './images/favicon-16x16.png',
  './images/ms-icon-144x144.png',
  './images/android-icon-36x36.png',
  './images/android-icon-48x48.png',
  './images/android-icon-72x72.png',
  './images/android-icon-96x96.png',
  './images/android-icon-144x144.png',
  './images/android-icon-192x192.png',
]

self.addEventListener('install', (e) => {
  console.log('[lordofpasswords.sw] Install')
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(FILES_TO_CACHE))
  )
})

// TODO: unregister other service-workers?

self.addEventListener('activate', (e) => {
  console.log('[lordofpasswords.sw] Activate')
  e.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        // eslint-disable-next-line array-callback-return, consistent-return
        keyList.map((key) => {
          if (key !== cacheName/*  && key.startsWith(appScope) */) {
            console.log('[lordofpasswords.sw] Removing old cache', key)
            return caches.delete(key)
          }
        })
      )
    )
  )
  return self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  console.log('[lordofpasswords.sw] Fetch', e.request.url)
  e.respondWith(
    caches.open(cacheName).then((cache) =>
      cache
        .match(e.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // If there is an entry in the cache for e.request, then cachedResponse will be defined
            // and we can just return it. Note that in this example, only font resources are cached.

            return cachedResponse
          }

          // Otherwise, if there is no entry in the cache for e.request, response will be
          // undefined, and we need to fetch() the resource.
          console.warn(
            ' No response for %s found in cache. About to fetch from network…',
            e.request.url
          )

          const precachedFiles = FILES_TO_CACHE.map(
            (relativePath) => new URL(relativePath, appScope).href
          )
          if (!precachedFiles.includes(e.request.url)) {
            return new Response('Locked', { status: 423, statusText: 'Locked' })
          }

          // We call .clone() on the request ...
          // ...since we might use it in a call to cache.put() later on.
          // Both fetch() and cache.put() "consume" the request, so we need to make a copy.
          // (see https://developer.mozilla.org/en-US/docs/Web/API/Request/clone)
          return fetch(e.request.clone()).then((response) => {
            if (response.ok) {
              console.warn('  Caching the response to', e.request.url)
              cache.put(e.request, response.clone())
            } else {
              console.error('  Not caching the response to', e.request.url)
            }

            // Return the original response object, ...
            // ...which will be used to fulfill the resource request.
            return response
          })
        })
        .catch((err) => {
          // This catch() will handle exceptions that arise from the match() or fetch() operations.
          // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
          // It will return a normal response object that has the appropriate error code set.
          console.error('  Error in fetch handler:', err)

          throw err
        })
    )
  )
})
