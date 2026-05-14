const CACHE_NAME = 'alarmas-rt-v1';
const assets = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', event => {
  // Para la API no usamos cache, queremos datos reales
  if (event.request.url.includes('/api/')) {
    return fetch(event.request);
  }
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
