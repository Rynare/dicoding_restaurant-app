import { swalNotify } from "../../swal.js";
import { RestaurantCard } from "../../utils/restaurant/RestaurantCard.js";
import { Restaurants } from "../../utils/restaurant/Restaurants.js";
import { fetchViewAsHtml } from "../../utils/view-helper.js";
import { Controller } from "./Controller.js";
import { RestaurantListElementHandler } from "../../utils/restaurant/RestaurantListElementHandler.js";
import $ from 'jquery'

class HomeController extends Controller {
    constructor() {
        super()
        this._restaurantListElementHandler = null;
        this._restaurants = null;
        this._view,
            document.querySelector('#app-content').innerHTML = '';
        this.render()
    }

    async render() {
        const template = document.createElement('template')
        this._view = await fetchViewAsHtml("/pages/index.html")
        template.innerHTML = this._view
        this._view = template.content.cloneNode(true)
        document.querySelector('#app-content').appendChild(this._view);
        this._restaurantListElementHandler = new RestaurantListElementHandler('.restaurant-list');
        this._restaurants = new Restaurants();
        this.randomizeJumbotronContent()
        this.renderList()
        this.listenSearch()
    }

    randomizeJumbotronContent() {
        const desc = [
            'Jelajahi kelezatan kuliner Indonesia di Food Master. Temukan berbagai restoran terbaik yang menyajikan hidangan khas dari berbagai daerah di Indonesia.',
            'Panduan lengkap Anda untuk menemukan tempat makan terbaik di Indonesia. Dari makanan jalanan yang lezat hingga restoran mewah.'
        ];

        const jumbotronDesc = $('.jumbotron-description');
        const randomDesc = desc[Math.floor(Math.random() * desc.length)];
        jumbotronDesc.html(randomDesc);
    }

    renderList(datas = this._restaurants.getAllData()) {
        this._restaurantListElementHandler.removeAll()
        datas.forEach((value) => {
            const restaurantCard = new RestaurantCard('#card-template');
            const newCard = restaurantCard.makeCard(value);
            this._restaurantListElementHandler.appendCard(newCard);
        })
    }

    listenSearch() {
        const searchInput = $('.search-bar [name=search-resto]')

        const searchAction = (keyword) => {
            const result = this._restaurants.getByKeyword(keyword)
            if (result.length > 0) {
                this.renderList(result)
            } else {
                swalNotify({
                    title: 'Upps...',
                    text: 'Data tidak ditemukan.',
                    icon: 'error',
                    timer: 2000
                })
                this._restaurantListElementHandler.noData()
            }
        }

        searchInput.on('keypress', function (event) {
            if (event.key === 'Enter') {
                const keyword = $(this).val();
                searchAction(keyword)
            }
        });

        $('.search-bar [name=search-resto-submit-btn]').on('click', function (event) {
            const keyword = searchInput.val()
            searchAction(keyword)
        });
    }
}

export { HomeController }