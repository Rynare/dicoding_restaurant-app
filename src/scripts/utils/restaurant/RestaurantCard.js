import $ from "jquery";
import { Restaurants } from "./Restaurants";
class RestaurantCard {
    constructor(elementQuery) {
        if (new.target === undefined) {
            throw new Error("RestaurantCard must be initialized with 'new'");
        }
        this._template = $(elementQuery).contents().clone(true);
    }

    makeCard({ id, name, description, pictureId, city, rating }) {
        this._template.find('#restaurant-img').attr('src', Restaurants.getImageResolutionUrl({ resolution: 'small', pictureId: pictureId }));
        this._template.find('#restaurant-img').attr('alt', `gambar restoran ${name}`);
        this._template.find('#restaurant-location').text(city);
        this._template.find('#restaurant-location').attr('aria-label', `restoran ini berlokasi di ${city}`);
        this._template.find('#restaurant-name').text(name);
        this._template.find('#restaurant-name').attr('aria-label', `restoran ini bernama ${name}`);
        this._template.find('rating-component').attr('rating', rating);
        this._template.find('#restaurant-description').text(description);
        this._template.find('#restaurant-description').attr('aria-label', `deskripsi restoran: ${description}`);
        this._template.find('#open-detail-btn').attr({
            'href': `/#/detail/${id}`,
            'aria-label': `untuk membuka detail informasi ${name} klik tombol ini`,
        });

        return this;
    }

    getCard() {
        return this._template;
    }
}

export { RestaurantCard }