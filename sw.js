// Este Service Worker no guarda archivos, solo permite que la web sea instalable
self.addEventListener('install', () => {
  console.log('App instalada');
});

self.addEventListener('fetch', (event) => {
  // No hace nada, deja que el navegador busque todo en internet (GitHub)
  return;
});
