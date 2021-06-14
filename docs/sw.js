// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
// This variable is intentionally declared and unused.
const OFFLINE_VERSION = 2;
const cacheName = 'cache-v1';
const resources = [
  '/',
  'index.html',
  'styles.css',
  'favicon.ico',
  'images/icon-192.png',
  'images/icon-512.png',
  'images/icon.svg',
  'setup.js',
  'bundle.js',
];

self.addEventListener('install', event => {
  console.log('SW: install');
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(resources))
  );
});

self.addEventListener('activate', event => {
  console.log('SW: activate');
});

self.addEventListener('fetch', event => {
  console.log('SW: fetch ', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
      if (cachedResponse) {
        console.log('SW: cached ', event.request.url);
        return cachedResponse;
      }
      return fetch(event.request);
    })
    .catch(e => {
        console.log(e)
    })
  );
});