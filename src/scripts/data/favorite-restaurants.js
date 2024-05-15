import { openDB } from "idb";
import CONFIG from "../globals/config.js";

const { INDEXED_DB_NAME, INDEXED_DB_VERSION } = CONFIG;
const OBJECT_STORE_NAME = "favorite-restaurant";
const dbPromise = openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

const FavoriteRestaurantsIndexedDB = {
  async getRestaurant(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putRestaurant(restaurant) {
    const {
      id, name, description, pictureId, rating, city,
    } = restaurant;
    const arrayDatas = [id, name, description, pictureId, rating, city];
    if (arrayDatas.some((prop) => prop === null || prop === undefined)) {
      throw new Error("Restaurant harus memilki id, name, description, pictureId, rating, city");
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export { FavoriteRestaurantsIndexedDB };
