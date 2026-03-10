const CACHE_NAME = 'ship-eigo-v1';
const ASSETS = [
    '/english-express.html',
    '/wordList.js',
    '/wordList630.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
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
    const url = event.request.url;
    // Firebase / Firestore / AdSense / Anthropic API はキャッシュしない
    if (url.includes('firestore.googleapis') || url.includes('firebase') ||
        url.includes('googlesyndication') || url.includes('anthropic.com') ||
        url.includes('pagead')) {
        return;
    }
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});
