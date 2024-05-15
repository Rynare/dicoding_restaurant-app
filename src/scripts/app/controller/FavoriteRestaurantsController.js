import { FavoriteRestaurantsIndexedDB } from "../../data/favorite-restaurants.js";
import { RestaurantCard } from "../../web-components/RestaurantCard.js";
import { RestaurantList } from "../../web-components/RestaurantList.js";
import { Controller } from "./Controller.js";

class FavoriteRestaurantsController extends Controller {
  constructor() {
    super();
  }

  async index() {
    await this.view("./pages/favorite.html");

    const favList = new RestaurantList(".favorite-restaurant-list");
    const restaurants = await FavoriteRestaurantsIndexedDB.getAllRestaurants();
    restaurants.forEach((restaurant) => {
      try {
        const restaurantCard = new RestaurantCard("#card-template");
        const newCard = restaurantCard.makeCard(restaurant);
        favList.appendCard(newCard);
      } catch (error) {
        console.error(error);
      }
    });
    if (document.querySelectorAll(".favorite-restaurant-list>*").length <= 0) {
      favList.noData("Kamu belum menambahkan restoran ke daftar favorite.");
    }
  }
}

export { FavoriteRestaurantsController };
