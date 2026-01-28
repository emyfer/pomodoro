const CACHE_NAME = 'pomodoro-cache-v1';
const urlsToCache = ['/', '/index.html', '/style.css', '/app.js'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});


self.addEventListener("sync", event => {
  if (event.tag === "pomodoro-finished") {
    event.waitUntil(
      self.registration.showNotification("Pomodoro", {
        body: "Time for a break!"
      })
    );
  }
});