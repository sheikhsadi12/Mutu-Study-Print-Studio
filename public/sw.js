/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — BULLETPROOF PWA SERVICE WORKER (sw.js)
 * True Network-First Architecture: Never freezes preview across versions!
 * ============================================================================
 */

const CACHE_NAME = 'mutu-study-v3.1.0-live-sync';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest.webmanifest',
  '/css/variables.css',
  '/css/typography.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/ui.css',
  '/css/style.css',
  '/vendor/katex/katex.min.css',
  '/vendor/katex/katex.min.js',
  '/vendor/katex/auto-render.min.js',
  '/js/app.js',
  '/js/paginator.js',
  '/js/cover-studio.js',
  '/js/settings.js',
  '/js/demo-content.js',
  '/icons/icon.svg',
  '/icons/badge.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/maskable-icon-512.png',
  '/icons/apple-touch-icon.png'
];

// 1. Install Event: Activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[MUTU PWA SW] Caching app shell assets...');
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          fetch(url, { cache: 'no-cache' })
            .then((res) => {
              if (res.ok) return cache.put(url, res);
            })
            .catch(() => {})
        )
      );
    })
  );
});

// 2. Activate Event: Purge ALL previous caches and take control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[MUTU PWA SW] Deleting obsolete cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Message handler: Allow instant cache purge
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  } else if (event.data === 'clearCache') {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
});

// 4. Fetch Handler: 100% Network-First
// Always fetch from network so code changes & version changes reflect instantly!
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, clone));
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache ONLY when completely offline
        return caches.match(request, { ignoreSearch: true })
          .then((cached) => cached || (request.mode === 'navigate' ? caches.match('/index.html') : null));
      })
  );
});

// 5. Notification Click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
