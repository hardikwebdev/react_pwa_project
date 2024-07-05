//STORAGE OF BROWSER
const CACHE_NAME = "version-1";
const urlsToCache = [
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/static/js/bundle.js",
  "/js/bootstrap5/bootstrap.bundle.min.js",
  "/js/bootstrap5/bootstrap.min.css",
  "/js/bootstrap5/bootstrap.min.js",
  "/js/bootstrap5/popper.min.js",
  "image/user.jpg",
  "/index.html",
  "/offline.html",
  "/",
];
const self = this;

//installation
// store data to the cache file
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// listen for request
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(urlsToCache);
      cache.put(e.request, response.clone());
      return response;
    })(),
  );
});

// actitivate the service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];  
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
