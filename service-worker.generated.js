/* eslint-disable no-restricted-globals, no-console */

const dev = location.hostname === 'localhost'
console.log(`Build date: Wed  1 Jun 2022 10:27:40 CEST, ${dev ? 'development mode' : 'production mode'}`)

const CASHE_NAME = 'v4'
const FILES_TO_CASHE = [
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

if (dev) {
  console.log('[ServiceWorker] SKIPPED DUE TO DEVELOPMENT MODE')
} else {
  self.addEventListener('install', e => {
    console.log('[ServiceWorker] Install')
    e.waitUntil(caches.open(CASHE_NAME).then(cache => cache.addAll(FILES_TO_CASHE)))
  })

  self.addEventListener('activate', e => {
    console.log('[ServiceWorker] Activate')
    e.waitUntil(
      caches.keys().then(keyList => Promise.all(
        // eslint-disable-next-line array-callback-return, consistent-return
        keyList.map(key => {
          if (key !== CASHE_NAME) {
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
    e.respondWith(
      caches
        .match(e.request)
        .then(res => res || new Response('Locked', { status: 423, statusText: 'Locked' }))
    )
  })
}
