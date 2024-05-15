const { FavoriteRestaurantsIndexedDB } = require("../src/scripts/data/favorite-restaurants");
const { FavButton } = require("../src/scripts/web-components/FavButton");

describe("Favorite Restaurant Button", () => {

  const correctRestaurantData = {
        id: 'w9pga3s2tubkfw1e867', 
        name: 'Bring Your Phone Cafe', 
        description: 'Quisque rutrum. Aenean imperdiet. Etiam ultricies …o eget bibendum sodales, augue velit cursus nunc,', 
        pictureId: '03', 
        rating: 4.2,
        city:"surabaya"
      }

  it("favorite button successfully rendered", async () => {
    document.body.innerHTML = `
      <div class="fav-btn-wrapper1"></div>
      <div class="fav-btn-wrapper2"></div>
    `;

    new FavButton({
      container: document.querySelector(".fav-btn-wrapper1"),
      restaurantData: { id:1 }
    }).render().addClickEvent();
    new FavButton({
      container: document.querySelector(".fav-btn-wrapper2"),
      restaurantData: correctRestaurantData
    }).render().addClickEvent();

    expect(document.querySelector(".fav-btn-wrapper1 .fav-btn")).toBeTruthy();
    expect(document.querySelector(".fav-btn-wrapper2 .fav-btn")).toBeTruthy();
  });

  it("like the correct restaurant", async () => {
    document.querySelector(".fav-btn-wrapper2 .fav-btn").dispatchEvent(new Event("click"));
    expect(await FavoriteRestaurantsIndexedDB.getAllRestaurants()).toEqual([correctRestaurantData]);
  });

  it("unlike the restaurant", async () => {
    document.querySelector(".fav-btn-wrapper2 .fav-btn").dispatchEvent(new Event("click"));
    expect(await FavoriteRestaurantsIndexedDB.getAllRestaurants()).toEqual([]);
  });
});
