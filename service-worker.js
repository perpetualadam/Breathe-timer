// service-worker.js
// service-worker.js

const CACHE_NAME = "breathing-timer-cache-v2";
const urlsToCache = [
  const urlsToCache = [
  "/breathe-timer/index.html",
  "/breathe-timer/styles.css",
  "/breathe-timer/app.js",
  "/breathe-timer/bell.mp3",
  "/breathe-timer/manifest.json",
  "/breathe-timer/icon-192.png",
  "/breathe-timer/icon-512.png"
];
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app shell...");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Allow external URLs (like Buy Me a Coffee) to bypass the service worker
  if (!event.request.url.startsWith(self.location.origin)) {
    console.log("Skipping external request:", event.request.url);
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
