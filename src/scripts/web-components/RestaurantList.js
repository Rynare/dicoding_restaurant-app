import $ from "jquery";
import { RestaurantCard } from "./RestaurantCard.js";

class RestaurantList {
  constructor(parent) {
    if (new.target === undefined) {
      throw new Error("RestaurantList must be initialized with 'new'");
    }
    this._parent = $(parent);
    if (this._parent.length === 0) {
      throw new Error("Parent element is null or undefined");
    }
  }

  appendCard(card) {
    if (!(card instanceof RestaurantCard)) {
      throw new Error("Parameter must be instance of RestaurantCard");
    }
    $(card.getCard()).appendTo(this._parent);
  }

  removeAll() {
    this._parent.html("");
  }

  noData(msg) {
    this._parent.html(`
            <div id="empty_restaurant_list">
                <p style="text-align: center;color: red;" tabindex="0">${msg || "Upps...Data tidak ditemukan."}</p>
            </div>
        `);
  }
}

export { RestaurantList };
