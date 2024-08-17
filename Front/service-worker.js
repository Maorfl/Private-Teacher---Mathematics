const CACHE_NAME = "michaioffe";

// Assets to pre-cache (e.g., static assets, index.html, etc.)
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/src/assets/icons/icon-32.ico",
    "/src/assets/images/logo-144.png",
    "/src/assets/images/logo-192.png",
    "/src/assets/images/logo-512.png",
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

// Fetch event - serving cached content or falling back to network
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return the cached response if found, else fetch from network
            return (
                cachedResponse ||
                fetch(event.request).then((networkResponse) => {
                    // Optionally cache the new resource
                    return caches.open(CACHE_NAME).then((cache) => {
                        // Clone the response and store it in the cache
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
            );
        })
    );
});

// Optional: Listening for "skipWaiting" message to update the service worker immediately
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
