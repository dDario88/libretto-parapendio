// Fa funzionare il libretto anche senza rete (per esempio in decollo).
// Quando pubblichi una nuova versione dei file, aumenta il numero qui sotto.
const VERSIONE = 'libretto-v1';
const FILE_APP = [
  './', 'index.html', 'config.js', 'manifest.webmanifest', 'privacy.html',
  'icons/logo.webp', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIONE).then(c => c.addAll(FILE_APP)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSIONE && k !== 'libretto-font').map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // File dell'app: prima la rete (così arrivano gli aggiornamenti), poi la copia salvata.
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req)
        .then(r => { const copia = r.clone(); caches.open(VERSIONE).then(c => c.put(req, copia)); return r; })
        .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
    );
    return;
  }

  // Caratteri tipografici: prima la copia salvata.
  if (url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open('libretto-font').then(c => c.match(req).then(hit => hit || fetch(req).then(r => { c.put(req, r.clone()); return r; })))
    );
  }
  // Tutto il resto (Google, Drive) passa direttamente dalla rete.
});
