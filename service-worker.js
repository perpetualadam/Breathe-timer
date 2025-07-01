// service-worker.js

const CACHE_NAME = "breathing-timer-cache-v3";
const urlsToCache = [
  "/breathing-timer/index.html",
  "/breathing-timer/styles.css",
  "/breathing-timer/app.js",
  "/breathing-timer/bell.mp3",
  "/breathing-timer/manifest.json",
  "/breathing-timer/icon-192.png",
  "/breathing-timer/icon-512.png"
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
  // Allow external links (e.g. Buy Me a Coffee) to bypass service worker
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
