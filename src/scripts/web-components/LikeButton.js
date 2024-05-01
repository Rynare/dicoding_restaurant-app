import { FavoriteRestaurantsIndexedDB } from "../data/favorite-restaurants.js";

class LikeButton {
  constructor({
    container: newContainer,
    restaurantData: newData,
    isActive: newIsActive,
  }) {
    if ((newContainer instanceof HTMLElement) === false) {
      throw new Error("container bukan element HTML");
    }
    this._container = newContainer;
    this._data = newData;
    this._isActive = !!newIsActive;
  }

  render() {
    this._container.innerHTML = `
      <button class="fav-btn btn" is="switch-button" is-active="${this._isActive}">
          <i class="bi bi-heart-fill active"></i>
          <i class="bi bi-heart inactive"></i>
      </button>
    `;
    return this;
  }

  addClickEvent() {
    const favBtn = this._container.querySelector(".fav-btn");
    const { id } = this._data;
    favBtn.addEventListener("click", async () => {
      const isActive = favBtn.getAttribute("is-active");

      if (isActive && isActive.toLowerCase() === "false") {
        const isSuccessPutFav = await FavoriteRestaurantsIndexedDB.putRestaurant(this._data);
        if (isSuccessPutFav === id) {
          favBtn.setAttribute("is-active", "true");
        }
      } else {
        favBtn.setAttribute("is-active", "false");
        await FavoriteRestaurantsIndexedDB.deleteRestaurant(id);
      }
    });
  }
}

export { LikeButton };
