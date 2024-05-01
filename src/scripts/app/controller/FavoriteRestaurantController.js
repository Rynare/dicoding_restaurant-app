import { FavoriteRestaurantsIndexedDB } from "../../data/favorite-restaurants.js";
import { RestaurantCard } from "../../web-components/RestaurantCard.js";
import { RestaurantList } from "../../web-components/RestaurantList.js";
import { Controller } from "./Controller.js";

class FavoriteRestaurantController extends Controller {
  constructor() {
    super();
  }

  async index() {
    await this.view("./pages/favorite.html");

    const favList = new RestaurantList(".favorite-restaurant-list");
    const restaurants = await FavoriteRestaurantsIndexedDB.getAllRestaurants();
    restaurants.forEach((restaurant) => {
      const restaurantCard = new RestaurantCard("#card-template");
      const newCard = restaurantCard.makeCard(restaurant);
      favList.appendCard(newCard);
    });
  }
}

export { FavoriteRestaurantController };
