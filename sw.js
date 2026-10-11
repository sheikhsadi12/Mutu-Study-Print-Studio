/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — PRODUCTION SERVICE WORKER (sw.js)
 * Resilient Offline App Shell, Universal SPA Navigation & PWA Notification Hub
 * ============================================================================
 */

const CACHE_NAME = 'mutu-study-v1.2.0';

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
  '/icons/apple-touch-icon.png',
  '/icons/badge-72x72.png',
  '/icons/badge-96x96.png'
];

// Service Worker Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[MUTU PWA SW] Precaching core application assets...');
        return Promise.allSettled(
          PRECACHE_ASSETS.map((url) =>
            fetch(url, { cache: 'no-cache' })
              .then((response) => {
                if (response.ok) {
                  return cache.put(url, response);
                }
              })
              .catch((err) => {
                console.warn('[MUTU PWA SW] Failed to precache asset:', url, err);
              })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Service Worker Activation & Cache Cleanup
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[MUTU PWA SW] Purging outdated cache store:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy: SPA Navigation Fallback + Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  const url = new URL(request.url);

  // 1. Google Fonts: Cache-First
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);
        });
      })
    );
    return;
  }

  // 2. Navigation Requests (PWA launch, deep-links, app icon click, standalone window)
  // Guarantees zero 404s even if the host or edge returns an error
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // If valid response from server, store in cache and return
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put('/index.html', responseClone);
            });
            return networkResponse;
          }
          // If server returned 404 or 5xx, fall back to cached SPA entry
          return caches.match('/index.html', { ignoreSearch: true })
            .then((cached) => cached || caches.match('/', { ignoreSearch: true }))
            .then((cached) => cached || networkResponse);
        })
        .catch(async () => {
          // Network offline / connection failed: serve cached index.html immediately
          const cached = await caches.match('/index.html', { ignoreSearch: true });
          if (cached) return cached;
          const cachedRoot = await caches.match('/', { ignoreSearch: true });
          if (cachedRoot) return cachedRoot;
          return new Response('MUTU STUDY Studio Offline', {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        })
    );
    return;
  }

  // 3. Static Assets: Stale-While-Revalidate with ignoreSearch
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

// Notification Click Event Listener
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Background Push Listener
self.addEventListener('push', (event) => {
  let title = 'MUTU STUDY Studio';
  let body = 'আপনার স্টুডিওতে নতুন আপডেট এসেছে!';
  let data = { url: '/' };

  if (event.data) {
    try {
      const payload = event.data.json();
      if (payload.title) title = payload.title;
      if (payload.body) body = payload.body;
      if (payload.data) data = payload.data;
    } catch (e) {
      body = event.data.text();
    }
  }

  const options = {
    body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data,
    tag: 'mutu-push-notification',
    renotify: true
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
