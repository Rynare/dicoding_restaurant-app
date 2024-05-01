import $ from "jquery";
import { RestaurantsApi } from "../data/RestaurantsApi.js";

class RestaurantCard {
  constructor() {
    if (new.target === undefined) {
      throw new Error("RestaurantCard must be initialized with 'new'");
    }
    this._template = $("<div>").addClass("card");
  }

  makeCard({
    id, name, description, pictureId, city, rating,
  }) {
    const HTMLContent = `
      <div class="card-img">
        <img src="${RestaurantsApi.getImageResolutionUrl({ resolution: "small", pictureId })}" alt="gambar restoran ${name}" onerror="this.src = './images/assets/error-pict-landscape.png'" id="restaurant-img">
      </div>
      <div class="card-header">
        <div class="restaurant-location-container">
          <i class="bi bi-geo-alt-fill"></i>
          <span id="restaurant-location" tabindex="0" aria-label="restoran ini berlokasi di ${city}">${city}</span>
        </div>
        <h3 id="restaurant-name" tabindex="0" aria-label="restoran ini bernama ${name}">${name}</h3>
        <rating-component rating="${rating}"></rating-component>
      </div>
      <div class="card-description">
        <p id="restaurant-description" tabindex="0" aria-label="deskripsi restoran: ${description}">
          ${description}
        </p>
      </div>
      <div class="card-footer">
        <a href="/detail/${id}" id="open-detail-btn" is="link-router" class="btn" aria-label="untuk membuka detail informasi ${name} klik tombol ini">Detail</a>
      </div>
    `;
    this._template.html(HTMLContent);
    return this;
  }

  getCard() {
    return this._template;
  }
}

export { RestaurantCard };
