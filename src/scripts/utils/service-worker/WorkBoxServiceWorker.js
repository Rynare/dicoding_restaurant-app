import { Workbox } from "workbox-window";

const workBoxServiceWorker = async (path) => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported in the browser");
    return;
  }
  const wb = new Workbox(path);
  try {
    await wb.register();
    console.log("Service worker registered");
  } catch (error) {
    console.log("Failed to register service worker", error);
  }
};

export default workBoxServiceWorker;
