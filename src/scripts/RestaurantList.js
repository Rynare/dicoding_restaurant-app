import $ from 'jquery';
import { swalNotify } from './swal.js';

class RestaurantList {
    constructor(parentQuery, templateElementQuery) {
        this.parent = $(parentQuery) || null;
        this.template = $(templateElementQuery) || null;
    }

    removeAll() {
        this.parent.html('');
    }

    setEmpty() {
        swalNotify({
            title: 'Upps...',
            text: 'Data tidak ditemukan.',
            icon: 'error',
            timer: 2000
        })
        this.parent.html(`
            <div>
                <p style="text-align: center;color: red;">Upps...Data tidak ditemukan.</p>
            </div>
        `)
    }

    add(datas) {
        const newCard = this.template.contents().clone(true);
        const rating = +datas.rating;
        const starWidth = (rating / 5) * 100 - 3.9;

        newCard.find('#restaurant-img').attr('src', datas.pictureId);
        newCard.find('#restaurant-location').text(datas.city);
        newCard.find('#restaurant-location').attr('aria-label', `restoran ini berlokasi di ${datas.city}`);
        newCard.find('#restaurant-name').text(datas.name);
        newCard.find('#restaurant-name').attr('aria-label', `restoran ini bernama ${datas.name}`);
        newCard.find('#restaurant-rating').text(datas.rating);
        newCard.find('#restaurant-rating').attr('aria-label', `restoran ini memiliki ${rating} bintang`);
        newCard.find('.rating-star .fill-star').css('width', `${starWidth}%`);
        newCard.find('#restaurant-description').text(datas.description);
        newCard.find('#restaurant-description').attr('aria-label', `deskripsi restoran: ${datas.description}`);;

        newCard.appendTo(this.parent);
    }
}


export { RestaurantList }