const staticDevMovie = "PWA";
const toPutInCache = ["index.html", "./css/style.css"]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevMovie).then(async cache => {
      cache.addAll(toPutInCache);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
