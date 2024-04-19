import CacheHelper from "../cache/cache-helper.js";

const version = '1.0.0';
const CACHE_NAME = `mypwa-${version}`;

// Daftar asset yang akan di-caching
const assetsToCache = [
    './',
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-144x144.png',
    './icons/icon-152x152.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png',
    './index.html',
    './favicon.png',
    './app.bundle.js',
    './app.webmanifest',
    './sw.bundle.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(CacheHelper.revalidateCache(event.request));
});

// ! ==============================================================================
// *                        Contoh Penggunaan ada dibawah ini
// ! ==============================================================================

self.addEventListener('install', (event) => {
    console.log('Installing service worker....');

    // menyimpan appshell ke caches API
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((caches) => caches.addAll(assetsToCache)),
    );
});

self.addEventListener('activate', (event) => {
    console.log('Activating service worker...');

    // menghapus caches lama
    event.waitUntil(
        caches.keys()
            .then((cachesNames) => Promise.all(
                cachesNames.filter((name) => name !== CACHE_NAME)
                    .map((filteredName) => caches.delete(filteredName))
            )),
    );
});

self.addEventListener('fetch', (event) => {
    // service worker bisa menampilkan, bahkan memanipulasi request yang dilakukan client
    console.log(event.request);

    // sebelum akhirnya mengirim request ke server.
    event.respondWith(
        fetch(event.request),
    );
});
// * =============== untuk file index.js ================
navigator.serviceWorker.register('/sw.js');
// * even - messagee
navigator.serviceWorker.ready.then(registration => {
    registration.active.postMessage('Hi service worker');
});
// * even - sync
navigator.serviceWorker.ready.then(swRegistration => {
    return swRegistration.sync.register('foo');
});
//! =====================================================

self.addEventListener('message', (event) => {
    // menampilkan data/pesan yang dikirim client
    console.log(`Client mengirim pesan: ${event.data}`);
});

self.addEventListener('sync', function (event) {
    if (event.tag === 'foo') {
        event.waitUntil(doSomething());
    }
});

const options = {
    // ...
}

self.addEventListener('push', (event) => {
    event.waitUntil(
        self.registration.showNotification('Halo Coder!', options),
    );
});