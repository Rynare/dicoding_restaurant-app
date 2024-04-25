import CacheHelper from "../cache/cache-helper.js";

const version = '1.0.0';
const CACHE_NAME = `mypwa-${version}`;

// Daftar asset yang akan di-caching
const assetsToCache = [
    './',
    './assets/favicon.ico',
    './assets/favicon-16x16.png',
    './assets/favicon-32x32.png',
    './assets/favicon-48x48.png',
    './assets/apple-touch-icon-57x57.png',
    './assets/apple-touch-icon-60x60.png',
    './assets/apple-touch-icon-72x72.png',
    './assets/apple-touch-icon-76x76.png',
    './assets/apple-touch-icon-114x114.png',
    './assets/apple-touch-icon-120x120.png',
    './assets/apple-touch-icon-144x144.png',
    './assets/apple-touch-icon-152x152.png',
    './assets/apple-touch-icon-167x167.png',
    './assets/apple-touch-icon-180x180.png',
    './assets/apple-touch-icon-1024x1024.png',
    './index.html',
    './app.bundle.js',
    './images/icon/logo-fit.png',
    './images/heros/hero-image_1.jpg',
    './serviceWorker.bundle.js',
    //// './favicon.png',
    //// './assets/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
    console.log('Installing Service Worker ...');

    // TODO: Caching App Shell Resource
    event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
    console.log('Activating Service Worker ...');

    // TODO: Delete old caches
    event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
    console.log(event.request);

    event.respondWith(fetch(event.request));
    // TODO: Add/get fetch request to/from caches
    event.respondWith(CacheHelper.revalidateCache(event.request));
});

self.addEventListener('push', (event) => {
    event.waitUntil(
        self.registration.showNotification('Halo Coder!', options),
    );
});