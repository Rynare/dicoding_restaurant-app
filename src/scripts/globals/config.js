const CONFIG = {
    KEY: 'YOUR_API_KEY',
    BASE_URL: 'https://api.themoviedb.org/3/',
    RESTAURANT_ENDPOINT: 'https://restaurant-api.dicoding.dev',
    BASE_IMAGE_URL: 'https://image.tmdb.org/t/p/w500/',
    DEFAULT_LANGUAGE: 'en-us',
    // CACHE_NAME: 'MovieCatalogue-V1',
    CACHE_NAME: new Date().toISOString(),
    DATABASE_NAME: 'restaurant-catalogue-database',
    DATABASE_VERSION: 1,
    OBJECT_STORE_NAME: 'favorites_movie',
    WEB_SOCKET_SERVER: 'wss://restaurant-api.dicoding.dev',
};

module.exports = CONFIG;