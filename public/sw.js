// Offline shell for Consult Scribe.
// Never caches API calls (they are cross-origin POSTs).
const VERSION = '__VERSION__';
const CACHE = 'scribe-' + VERSION;
const SHELL = ['./', 'index.html', 'app.js', 'app.css', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});
// Files whose name or ?v= changes with every version never change once made: serve them from the cache, so the app
// opens fast. Everything else (the page itself) is network first, so a new deploy shows straight away.
const FIXED = (url) => url.searchParams.has('v') || /\/chunks\/[^/]+-[A-Z0-9]{8}\.js$/.test(url.pathname);
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  if (FIXED(url)) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })),
    );
    return;
  }
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match('index.html'))),
  );
});
