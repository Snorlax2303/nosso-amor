// ============================================
// SERVICE WORKER — Nosso Amor PWA
// Estratégia: network-first pra HTML/JS, cache-first só pra imagens/fonts
// ============================================
const CACHE_NAME = 'nosso-amor-v15';  // v15: 🐛 fix galeria (altura dinâmica + removeu screenshot Cloudflare) + 🎨 4 brincadeiras (lousa+dado+roleta+baralho)
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/install.html',
  '/manifest.json',
  '/css/style.css',
  '/css/install.css',
  '/js/app.js',
  '/js/config.js',
  '/js/marcos.js',
  '/js/musicas.js',
  '/js/fotos.js',
  '/js/mensagens.js',
  '/js/carta.js',
  '/js/install.js',
  '/js/mascot.js',
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
  const url = new URL(request.url);

  // Pra navegação (HTML): network-first SEMPRE (pra ver updates)
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

  // Pra JS/CSS/manifest: network-first (updates do código chegam rápido)
  if (
    url.pathname.startsWith('/js/') ||
    url.pathname.startsWith('/css/') ||
    url.pathname.endsWith('.json') ||
    url.pathname.endsWith('.webmanifest')
  ) {
    event.respondWith(
      fetch(request)
        .then(resp => {
          if (resp && resp.status === 200) {
            const clone = resp.clone();
            caches.open(CACHE_NAME).then(c => c.put(request, clone));
          }
          return resp;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Pra imagens/fonts: cache-first (perf)
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
