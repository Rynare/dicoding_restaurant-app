import { FavoriteRestaurantsIndexedDB } from "../../data/favorite-restaurants.js";
import { RestaurantCard } from "../../utils/restaurant/RestaurantCard.js";
import { RestaurantListElementHandler } from "../../utils/restaurant/RestaurantListElementHandler.js";
import { Controller } from "./Controller.js";

class FavoriteRestaurantController extends Controller {
    constructor() {
        super()
    }

    async index() {
        this._view = await this._fetchView('./pages/favorite.html')
        this._renderPage()

        this.favList = new RestaurantListElementHandler('.favorite-restaurant-list')
        const restaurants = await FavoriteRestaurantsIndexedDB.getAllRestaurants()
        restaurants.forEach(restaurant => {
            const restaurantCard = new RestaurantCard('#card-template');
            const newCard = restaurantCard.makeCard(restaurant);
            this.favList.appendCard(newCard)
        })
    }
}

export { FavoriteRestaurantController }