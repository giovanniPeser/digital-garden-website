/**
 * Digital Garden - Service Worker
 * Provides offline support and resource caching
 */

const CACHE_NAME = 'digital-garden-v1.3.7';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './privacy.html',
    './css/style.css?v=1.3.7',
    './js/main.js?v=1.3.7',
    './data/stats.json?v=1.3.7',
    './manifest.json',
    './images/ic_launcher-playstore.png'
];

// Install Event: Cache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event: Cache-first strategy for assets, Network-first for others
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            // Fallback for extensionless URLs (e.g. /privacy -> /privacy.html)
            // Works in production AND on localhost
            if (url.origin === self.location.origin) {
                const path = url.pathname;
                if (!path.includes('.') && !path.endsWith('/')) {
                    const fallbackUrl = path + '.html';
                    return caches.match(fallbackUrl).then((htmlResponse) => {
                        return htmlResponse || fetch(event.request);
                    });
                }
            }

            return fetch(event.request).then((networkResponse) => {
                // Cache screenshots and icons dynamically
                if (url.origin === self.location.origin &&
                   (url.pathname.includes('/images/') || url.pathname.endsWith('.png') || url.pathname.endsWith('.webp'))) {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Fallback for offline mode if not in cache
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
