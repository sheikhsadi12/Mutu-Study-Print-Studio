/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — SERVICE WORKER (sw.js)
 * Offline Asset Caching, Stale-While-Revalidate Engine & PWA Notification Hub
 * ============================================================================
 */

const CACHE_NAME = 'mutu-study-v1.1.0';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/variables.css',
  './css/typography.css',
  './css/layout.css',
  './css/components.css',
  './css/ui.css',
  './css/style.css',
  './js/app.js',
  './js/paginator.js',
  './js/cover-studio.js',
  './js/settings.js',
  './js/demo-content.js',
  './icons/icon.svg',
  './icons/badge.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/badge-72x72.png',
  './icons/badge-96x96.png'
];

// Service Worker Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[MUTU PWA SW] Precaching application shell assets...');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('[MUTU PWA SW] Precache partial error (ignored for resilient install):', err);
        return self.skipWaiting();
      })
  );
});

// Service Worker Activation & Old Cache Purge
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[MUTU PWA SW] Removing outdated cache store:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network Fetch Strategy: Stale-While-Revalidate with Google Fonts Cache-First
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Google Fonts caching (Cache-First)
  if (request.url.includes('fonts.googleapis.com') || request.url.includes('fonts.gstatic.com')) {
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

  // App Shell & Local Assets: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
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
        .catch(() => {
          if (request.mode === 'navigate') {
            return caches.match('./index.html') || caches.match('./');
          }
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// Notification Click Event Listener
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data && event.notification.data.url ? event.notification.data.url : './';

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

// Push Event Listener for Background Notifications
self.addEventListener('push', (event) => {
  let title = 'MUTU STUDY Studio';
  let body = 'আপনার স্টুডিওতে নতুন আপডেট এসেছে!';
  let data = { url: './' };

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
    icon: './icons/icon-192.png',
    badge: './icons/badge-72x72.png', // White monochrome emblem silhouette for status bar
    vibrate: [100, 50, 100],
    data,
    tag: 'mutu-push-notification',
    renotify: true
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
