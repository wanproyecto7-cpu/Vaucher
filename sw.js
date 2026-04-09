// 1. CAMBIA ESTE NOMBRE cada vez que subas una actualización a GitHub
// Ejemplo: 'yape-v1', 'yape-v2', etc.
const CACHE_NAME = 'yape-pwa-v1';

// 2. Lista de archivos que quieres que funcionen offline (ajusta los nombres)
const ASSETS_TO_CACHE = [
  './',
  './index2.html',
  './index5.html',
  './manifest.json',
  './vid.mp4',
  './ba.jpg',
  './yp4.jpg'
];

// Instalación: Guarda los archivos en el caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache abierto, guardando archivos...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Fuerza a que el nuevo SW tome el control de inmediato
  self.skipWaiting();
});

// Activación: Borra los cachés viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Borrando caché antiguo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Reclama el control de las pestañas abiertas
  self.clients.claim();
});

// Estrategia de red: Busca en internet, si falla usa el caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
