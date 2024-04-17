import $ from "jquery";
class RestaurantCard {
    constructor(elementQuery) {
        if (new.target === undefined) {
            throw new Error("RestaurantCard must be initialized with 'new'");
        }
        this._template = $(elementQuery).contents().clone(true);
    }

    makeCard(datas) {
        const rating = +datas.rating;
        const starWidth = (rating / 5) * 100 - 3.9;

        this._template.find('#restaurant-img').attr('src', datas.pictureId);
        this._template.find('#restaurant-img').attr('alt', `gambar restoran ${datas.name}`);
        this._template.find('#restaurant-location').text(datas.city);
        this._template.find('#restaurant-location').attr('aria-label', `restoran ini berlokasi di ${datas.city}`);
        this._template.find('#restaurant-name').text(datas.name);
        this._template.find('#restaurant-name').attr('aria-label', `restoran ini bernama ${datas.name}`);
        this._template.find('#restaurant-rating').text(datas.rating);
        this._template.find('#restaurant-rating').attr('aria-label', `restoran ini memiliki ${rating} bintang`);
        this._template.find('.rating-star .fill-star').css('width', `${starWidth}%`);
        this._template.find('#restaurant-description').text(datas.description);
        this._template.find('#restaurant-description').attr('aria-label', `deskripsi restoran: ${datas.description}`);

        return this;
    }

    getCard() {
        return this._template;
    }
}

export { RestaurantCard }