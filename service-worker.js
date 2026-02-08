const CACHE_NAME = 'phestone-mission-v1.0.5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './quotes_feed.json'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch Assets
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
