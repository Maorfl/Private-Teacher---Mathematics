const CACHE_NAME = "michaioffe";

// Assets to pre-cache (e.g., static assets, index.html, etc.)
const urlsToCache = [
    // Add additional static assets here
];

// Install event - caching static assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting(); // Force the waiting service worker to become active
});

// Activate event - cleaning up old caches
self.addEventListener("activate", (event) => {
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
    self.clients.claim(); // Take control of all clients as soon as possible
});
