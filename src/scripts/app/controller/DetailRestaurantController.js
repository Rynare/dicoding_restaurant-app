import $ from "jquery";
import { Restaurants } from "../../utils/restaurant/Restaurants.js";
import { Controller } from "./Controller.js";
import { FavoriteRestaurantsIndexedDB } from "../../data/favorite-restaurants.js";

class DetailRestaurantController extends Controller {
  constructor() {
    super();
    this._restaurants = null;
  }

  static restaurantShortData;

  async index() {
    this._view = await this._fetchView("/pages/resto-detail.html");
    this._renderPage();

    this._restaurants = new Restaurants();
    const result = await this.fetchDetail();
    const { renderReview } = this;

    if (result.error === false) {
      const {
        id, name, description, city, address, pictureId, categories, menus, rating, customerReviews,
      } = result.restaurant;
      DetailRestaurantController.restaurantShortData = {
        id: result.restaurant.id,
        name: result.restaurant.name,
        description: result.restaurant.description,
        pictureId: result.restaurant.pictureId,
        rating: result.restaurant.rating,
        city: result.restaurant.city,
      };
      const { foods, drinks } = menus;
      const imageUrl = Restaurants.getImageResolutionUrl({ resolution: "medium", pictureId });

      const indexDB = await FavoriteRestaurantsIndexedDB.getRestaurant(id);
      const isFav = indexDB !== undefined;
      $(".fav-btn").attr("is-active", isFav);
      $(".detail-header.restaurant-image").css("background-image", `url(${imageUrl})`);
      $(".restaurant-name").text(name);
      $("rating-component").attr("rating", rating);
      $(".restaurant-categories").html(`<i class="bi bi-tag" style="color: gold;"></i> ${categories.map((category) => `${category.name}`).join(", ")}`);
      $("address").html(`<i class="bi bi-geo-alt-fill" style="color:red;"></i> ${address}, ${city}`);
      $(".restaurant-description").text(description);
      $(".menu-list-category .foods").html(
        `<li>${foods.map((food) => `${food.name}`).join("</li><li>")}</li>`,
      );
      $(".menu-list-category .drinks").html(
        `<li>${drinks.map((drink) => drink.name).join("</li><li>")}</li>`,
      );

      renderReview(customerReviews);
    }

    document.querySelector(".review-box form").addEventListener("submit", async function formSubmitEvent(event) {
      event.preventDefault();

      const formData = new FormData(this);
      const formDataObject = {
        id: Controller.parameters.id,
        name: formData.get("name"),
        review: formData.get("review"),
      };

      try {
        const isSuccessAddReview = await Restaurants.addReview(formDataObject);
        if (isSuccessAddReview.error === false) {
          renderReview(isSuccessAddReview.customerReviews);
          $(".review-box form [type=reset]").trigger("click");
        }
      } catch (error) {
        console.error(error);
      }
    });

    const favBtn = $(".fav-btn");
    favBtn.on("click", async (e) => {
      const isActive = favBtn.attr("is-active");

      if (isActive && isActive.toLowerCase() === "false") {
        const isSuccessPutFav = await FavoriteRestaurantsIndexedDB.putRestaurant(DetailRestaurantController.restaurantShortData);
        if (isSuccessPutFav === Controller.parameters.id) {
          favBtn.attr("is-active", "true");
        }
      } else {
        favBtn.attr("is-active", "false");
        await FavoriteRestaurantsIndexedDB.deleteRestaurant(Controller.parameters.id);
      }
    });
  }

  async fetchDetail() {
    const { id } = Controller.parameters;
    const detail = await this._restaurants.getDetailById(id);

    return detail;
  }

  // eslint-disable-next-line class-methods-use-this
  renderReview(customerReviews) {
    $(".restaurant-reviews-list").html(
      customerReviews.map((customerReview) => {
        const { name, review, date } = customerReview;
        return `
                    <div class="review-bubble">
                        <span></span>
                        <div class="review-body">
                            <div class="reviewer-name">${name}</div>
                            <div class="reviewer-msg">${review}</div>
                            <div class="review-date">${date}</div>
                        </div>
                    </div>
                `;
      }).join(""),
    );
  }
}

export { DetailRestaurantController };
