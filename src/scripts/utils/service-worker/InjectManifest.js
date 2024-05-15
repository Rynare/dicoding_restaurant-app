import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, Route } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import CONFIG from "../../globals/config.js";

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

const theRestaurantDBApi = new Route(
  ({ url }) => url.href.startsWith(`${CONFIG.RESTAURANT_ENDPOINT}/`),
  new StaleWhileRevalidate({
    cacheName: "restaurants-api",
  }),
);

registerRoute(theRestaurantDBApi);

self.addEventListener("install", () => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("push", (event) => {
  console.log("Service Worker: Pushed");

  const notificationData = {
    title: "Push Notification",
    options: {
      body: "This is a push notification",
      icon: "/favicon.webp",
      image: "/icon-512x512/icon-512x512.webp",
    },
  };

  const showNotification = self.registration.showNotification(
    notificationData.title,
    notificationData.options,
  );

  event.waitUntil(showNotification);
});
