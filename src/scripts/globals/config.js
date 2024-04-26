const CONFIG = {
  KEY: "YOUR_API_KEY",
  RESTAURANT_ENDPOINT: "https://restaurant-api.dicoding.dev",
  DEFAULT_LANGUAGE: "en-us",
  CACHE_NAME: new Date().toISOString(),
  DATABASE_NAME: "restaurant-catalogue-database",
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: "favorite_restaurants",
  WEB_SOCKET_SERVER: "wss://restaurant-api.dicoding.dev",
};

module.exports = CONFIG;
