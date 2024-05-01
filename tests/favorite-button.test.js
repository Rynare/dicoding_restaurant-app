const { FavoriteRestaurantsIndexedDB } = require("../src/scripts/data/favorite-restaurants");
const { LikeButton } = require("../src/scripts/web-components/LikeButton");

describe("Favorite Restaurant Button", () => {

  it("favorite button successfully rendered", async () => {
    document.body.innerHTML = '<div class="fav-btn-wrapper"></div>';

    const like = new LikeButton({
      container: document.querySelector(".fav-btn-wrapper"),
      restaurantData: { id: 1 }
    });

    like.render().addClickEvent();

    expect(document.querySelector(".fav-btn-wrapper .fav-btn")).toBeTruthy();
  });

  it("like the restaurant", async () => {
    document.querySelector(".fav-btn-wrapper .fav-btn").dispatchEvent(new Event("click"));
    expect(await FavoriteRestaurantsIndexedDB.getAllRestaurants()).toEqual([{ id: 1 }]);
  });

  it("unlike the restaurant", async () => {
    document.querySelector(".fav-btn-wrapper .fav-btn").dispatchEvent(new Event("click"));
    expect(await FavoriteRestaurantsIndexedDB.getAllRestaurants()).toEqual([]);
  });
});
