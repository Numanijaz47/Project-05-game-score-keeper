self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('score-cache-v1.1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json', // Manifest file
        'css/style.css',
        'js/script.js',
        '/icon-192.png',
        '/icon-512.png',
        // Caching Bootstrap & Icons from CDN
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
        'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});