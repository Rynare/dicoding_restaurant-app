const RegisterServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) {
        console.log('Browser tidak mendukung Service Worker');
        return;
    }

    try {
        await navigator.serviceWorker.register('./ServiceWorker.bundle.js');
        console.log('Service worker registered');
    } catch (error) {
        console.log('Failed to register service worker', error);
    }
};

export { RegisterServiceWorker }