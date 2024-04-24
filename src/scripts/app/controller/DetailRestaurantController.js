import { Restaurants } from "../../utils/restaurant/Restaurants.js";
import { Controller } from "./Controller.js";
import $ from 'jquery'

class DetailRestaurantController extends Controller {
    constructor() {
        super()
        this._restaurants = null;
    }

    async index() {
        this._view = await this._fetchView("/pages/resto-detail.html")
        this._renderPage();


        this._restaurants = new Restaurants()
        const result = await this.fetchDetail();
        const renderReview = this.renderReview

        if (result.error == false) {
            const { id, name, description, city, address, pictureId, categories, menus, rating, customerReviews } = result.restaurant
            const { foods, drinks } = menus
            const imageUrl = Restaurants.getImageResolutionUrl({ resolution: 'medium', 'pictureId': pictureId });

            $('.detail-header.restaurant-image').css('background-image', `url(${imageUrl})`);
            $('.detail-body .restaurant-image').attr('src', Restaurants.getImageResolutionUrl({ resolution: 'small', 'pictureId': pictureId }))
            $('.restaurant-name').text(name)
            $('rating-component').attr('rating', rating)
            $('.restaurant-categories').html(`<i class="bi bi-tag" style="color: gold;"></i> ${categories.map(category => `${category.name}`).join(', ')}`);
            $('address').html(`<i class="bi bi-geo-alt-fill" style="color:red;"></i> ${address}, ${city}`)
            $('.restaurant-description').text(description)
            $('.menu-list-category .foods').html(
                `<li>${foods.map(food => `${food.name}`).join('</li><li>')}</li>`
            )
            $('.menu-list-category .drinks').html(
                `<li>${drinks.map(drink => drink.name).join('</li><li>')}</li>`
            )

            renderReview(customerReviews)
        }


        document.querySelector('.review-box form').addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(this);
            const formDataObject = {
                id: Controller.parameters.id,
                name: formData.get('name'),
                review: formData.get('review')
            };

            try {
                const result = await Restaurants.addReview(formDataObject)
                if (result.error == false) {
                    renderReview(result.customerReviews)
                    $('.review-box form [type=reset]').trigger('click')
                }
            } catch (error) {
                console.error(error)
            }
        });
    }

    async fetchDetail() {
        const { id } = Controller.parameters
        const detail = await this._restaurants.getDetailById(id)

        return detail
    }

    async postReview() {

    }

    renderReview(customerReviews) {
        $('.restaurant-reviews-list').html(
            customerReviews.map(customerReview => {
                const { name, review, date } = customerReview;
                return `
                    <div class="review-bubble">
                        <span></span>
                        <div class="review-body">
                            <div class="reviewer-name">${name}</div>
                            <div class="reviewer-msg">${review}</div>
                            <div class="review-date">${date}</div>
                        </div>
                    </div>
                `;
            }).join('')
        );
    }
}

export { DetailRestaurantController }