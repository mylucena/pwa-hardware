// Nome do cache
const CACHE_NAME = 'v1_cache';

// Arquivos para serem cacheados
const urlsToCache = [
  '/',
  '/index.html',
  '/lista.html',
  '/styles.css',
  '/lista.css',
  '/script.js',
  '/img/bolsa de compras.png',
  '/img/camera.png'
];

// Evento de instalação do service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Arquivos em cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de busca (fetch) para servir arquivos do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna o recurso do cache ou faz uma requisição à rede
        return response || fetch(event.request);
      })
  );
});

// Evento de ativação para atualizar o cache
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
