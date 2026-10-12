/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — ULTRA-SPEED ZERO-BLOAT SERVICE WORKER (sw.js)
 * High-performance, zero-accumulation, instant app shell delivery
 * ============================================================================
 */

const CACHE_NAME = 'mutu-study-v3.2.0-zero-bloat';
const MAX_CACHE_ITEMS = 25;

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
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
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/maskable-icon-512.png',
  '/icons/apple-touch-icon.png'
];

/**
 * Trim cache to enforce strict capacity limit (Zero bloat)
 */
async function trimCache(cacheName, maxItems) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
      await cache.delete(keys[0]);
      await trimCache(cacheName, maxItems);
    }
  } catch (e) {}
}

// 1. Install Event: Cache essential app shell and activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
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

// 2. Activate Event: Wipe ALL old cache versions immediately and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[MUTU PWA SW] Purging obsolete cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Message handler: Allow instant cache purge and skipWaiting
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  } else if (event.data === 'clearCache' || event.data === 'purgeAll') {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
});

// 4. Fetch Handler: Ultra-fast Stale-While-Revalidate for app assets, Network-First for HTML
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Never intercept iframe previews or dev hosts to ensure live reload
  const isDevHost = url.hostname.includes('run.app') || url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  if (isDevHost) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }

  // A. HTML Navigation Requests: Fast Network-first with 1.2s timeout fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      new Promise((resolve) => {
        let timedOut = false;
        const timer = setTimeout(() => {
          timedOut = true;
          caches.match('/index.html').then((cached) => {
            if (cached) resolve(cached);
          });
        }, 1200);

        fetch(request)
          .then((networkResponse) => {
            clearTimeout(timer);
            if (!timedOut && networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', clone));
              resolve(networkResponse);
            }
          })
          .catch(() => {
            clearTimeout(timer);
            caches.match('/index.html').then((cached) => resolve(cached || Response.error()));
          });
      })
    );
    return;
  }

  // B. Only cache same-origin local assets. NEVER bloat cache with third-party CDNs!
  const isSameOrigin = url.origin === self.location.origin;
  if (!isSameOrigin) {
    // External requests (like Google Fonts or CDN) go directly to network without caching to avoid bloat
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }

  // C. Stale-While-Revalidate for local core assets: INSTANT 0ms response from cache, silent revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
              trimCache(CACHE_NAME, MAX_CACHE_ITEMS);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      // Return cached response immediately if available, otherwise wait for network
      return cachedResponse || fetchPromise;
    })
  );
});

// 5. Notification Click Handler
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
