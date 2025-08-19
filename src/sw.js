// Service Worker for caching and performance optimization
const CACHE_NAME = 'clearvertise-v1';
const urlsToCache = [
  '/',
  '/css/main.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/analytics.js',
  '/screens/dashboard1.gif',
  '/screens/mediaPlan1.png',
  '/screens/mediaPlan2.png',
  '/screens/budget1.png',
  '/screens/budgetTile1.png',
  '/screens/settings1.png',
  '/screens/settings2.png',
  '/screens/settings3.png',
  '/screens/settings4.png',
  '/logo/logoSymbol.png',
  '/logo/logoSymbolWhite.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
