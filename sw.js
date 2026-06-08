// ============================================
// SERVICE WORKER — Nosso Amor PWA
// Estratégia: cache-first pra assets, network-first pro HTML
// ============================================
const CACHE_NAME = 'nosso-amor-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/js/app.js',
  '/js/config.js',
  '/js/marcos.js',
  '/js/musicas.js',
  '/js/fotos.js',
  '/js/mensagens.js',
  '/js/carta.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Pra navegação (HTML): network-first, cai pro cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(resp => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return resp;
        })
        .catch(() => caches.match(request).then(r => r || caches.match('/index.html')))
    );
    return;
  }

  // Pra assets: cache-first
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(resp => {
        if (!resp || resp.status !== 200 || resp.type === 'opaque') return resp;
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(request, clone));
        return resp;
      });
    })
  );
});
