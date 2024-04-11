import $ from 'jquery';

class RestaurantList {
    constructor(parentQuery, templateElementQuery) {
        this.parent = $(parentQuery) || null;
        this.template = $(templateElementQuery) || null;
    }

    removeAll() {
        this.parent.html('');
    }

    add(datas) {
        const newCard = this.template.contents().clone(true); // Clone the template contents
        const rating = +datas.rating;
        const starWidth = (rating / 5) * 100;

        newCard.find('#restaurant-img').attr('src', datas.pictureId);
        newCard.find('#restaurant-location').text(datas.city);
        newCard.find('#restaurant-name').text(datas.name);
        newCard.find('#restaurant-rating').text(rating);
        newCard.find('.rating-star .fill-star').css('width', `${starWidth}%`);
        newCard.find('#restaurant-description').text(datas.description);

        newCard.appendTo(this.parent);
    }
}


export { RestaurantList }