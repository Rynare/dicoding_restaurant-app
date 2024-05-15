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
    if ([id, name, description, pictureId, city, rating].some((prop) => prop === null || prop === undefined)) {
      throw new Error("Card harus memiliki id, name, description, pictureId, city, rating");
    }
    const HTMLContent = `
      <div class="card-img">
        <img data-src="${RestaurantsApi.getImageResolutionUrl({ resolution: "small", pictureId })}" alt="gambar restoran ${name}" onerror="this.setAttribute("data-src",'./images/assets/error-pict-landscape.webp')" id="restaurant-img" loading="lazy" class="lazyload">
      </div>
      <div class="card-header">
        <div class="restaurant-location-container">
          <i class="bi bi-geo-alt-fill"></i>
          <span id="restaurant-location" tabindex="0" aria-label="restoran ini berlokasi di ${city}">${city}</span>
        </div>
        <h3 id="restaurant-name" tabindex="0" aria-label="restoran ini bernama ${name}">${name}</h3>
        <star-rating rating="${rating}"></star-rating>
      </div>
      <div class="card-description">
        <p id="restaurant-description" tabindex="0" aria-label="deskripsi restoran: ${this.createExcerpt(description, 150)}">
          ${this.createExcerpt(description, 150)}
        </p>
      </div>
      <div class="card-footer">
        <a href="/detail/${id}" id="open-detail-btn" is="link-router" class="btn" aria-label="untuk membuka detail informasi ${name} klik tombol ini">Detail</a>
      </div>
    `;
    this._template.html(HTMLContent);
    return this;
  }

  createExcerpt(description, maxLength) {
    if (!description || description.length === 0) {
      return "";
    }
    if (description.length <= maxLength) {
      return description;
    }
    return `${description.substring(0, maxLength)}...`;
  }

  getCard() {
    return this._template;
  }
}

export { RestaurantCard };
