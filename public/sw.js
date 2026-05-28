const CACHE = "martindale-cache-v1";
const YOUTUBE_CACHE = "youtube-cache-v1";
const KNOWN_CACHES = [CACHE, YOUTUBE_CACHE];
const APP_ASSETS = ["/", "/manifest.json", "/site.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !KNOWN_CACHES.includes(key))
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") {
    return;
  }

  const url = new URL(e.request.url);

  if (
    url.hostname.includes("youtube.com") ||
    url.hostname.includes("ytimg.com")
  ) {
    e.respondWith(
      fetch(e.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(YOUTUBE_CACHE).then((cache) => {
            cache.put(e.request, responseClone).catch(() => {});
          });
          return networkResponse;
        })
        .catch(async () => (await caches.match(e.request)) || Response.error()),
    );
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        const responseClone = networkResponse.clone();
        caches.open(CACHE).then((cache) => {
          cache.put(e.request, responseClone).catch(() => {});
        });
        return networkResponse;
      })
      .catch(async () => (await caches.match(e.request)) || Response.error()),
  );
});
