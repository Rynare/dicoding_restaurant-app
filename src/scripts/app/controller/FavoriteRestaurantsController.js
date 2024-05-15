import $ from "jquery";
import { FavoriteRestaurantsIndexedDB } from "../../data/favorite-restaurants.js";
import { RestaurantCard } from "../../web-components/RestaurantCard.js";
import { RestaurantList } from "../../web-components/RestaurantList.js";
import { Controller } from "./Controller.js";
import { swalNotify } from "../../swal.js";

class FavoriteRestaurantsController extends Controller {
  constructor() {
    super();
  }

  async index() {
    await this.view("./pages/favorite.html");

    const favList = new RestaurantList(".favorite-restaurant-list");
    const restaurants = await FavoriteRestaurantsIndexedDB.getAllRestaurants();

    renderList(restaurants);

    function renderList(restaurantDatas) {
      favList.removeAll();
      restaurantDatas.forEach((restaurant) => {
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

    const listenSearch = () => {
      const searchInput = $(".search-bar [name=search-resto]");

      const searchAction = async (keyword) => {
        try {
          const result = await FavoriteRestaurantsIndexedDB.searchRestaurants(keyword);
          if (result.length > 0) {
            renderList(result);
          } else {
            swalNotify({
              title: "Upps...",
              text: "Restoran tidak ditemukan.",
              icon: "error",
              timer: 2000,
            });
            favList.noData("Kamu belum menambahkan restoran ke daftar favorite.");
          }
        } catch (error) {
          swalNotify({
            icon: "error",
            title: "Error!",
            text: "Kamu belum menambahkan restoran ke daftar favorit",
          });
          console.error("Kamu belum menambahkan restoran ke daftar favorit:", error);
        }
      };

      searchInput.off("keypress");
      searchInput.on("keypress", function searchEvent(event) {
        if (event.key === "Enter") {
          const keyword = $(this).val();
          searchAction(keyword);
        }
      });

      $(".search-bar [name=search-resto-submit-btn]").off("click");
      $(".search-bar [name=search-resto-submit-btn]").on("click", () => {
        const keyword = searchInput.val();
        searchAction(keyword);
      });
    };
    listenSearch();
  }
}

export { FavoriteRestaurantsController };
