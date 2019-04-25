/* eslint-disable no-restricted-globals, no-console */
const cacheName = 'masterpassword'
const filesToCache = ['/', '/index.html', '/app.js', '/style.css']

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install')
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(filesToCache)))
})

self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate')
  e.waitUntil(
    caches.keys().then(keyList => Promise.all(
      // FIXME: linter errors
      // eslint-disable-next-line array-callback-return, consistent-return
      keyList.map(key => {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key)
        }
      })
    ))
  )

  return self.clients.claim()
})

self.addEventListener('fetch', e => {
  console.log('[Service Worker] Fetch', e.request.url)
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)))
})
