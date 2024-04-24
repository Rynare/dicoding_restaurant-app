import { swalNotify } from "../../swal.js";
import { RestaurantCard } from "../../utils/restaurant/RestaurantCard.js";
import { Restaurants } from "../../utils/restaurant/Restaurants.js";
import { Controller } from "./Controller.js";
import { RestaurantListElementHandler } from "../../utils/restaurant/RestaurantListElementHandler.js";
import $ from 'jquery'

class HomeController extends Controller {
    constructor() {
        super()
        this._restaurantListElementHandler = null;
        this._restaurants = null;
        this._isRendered = false
    }

    async index() {
        this._view = await this._fetchView("/pages/home.html")
        this._renderPage();

        this._restaurantListElementHandler = new RestaurantListElementHandler('.restaurant-list');
        this._restaurants = new Restaurants();

        function randomizeJumbotronContent() {
            const desc = [
                'Jelajahi kelezatan kuliner Indonesia di Food Master. Temukan berbagai restoran terbaik yang menyajikan hidangan khas dari berbagai daerah di Indonesia.',
                'Panduan lengkap Anda untuk menemukan tempat makan terbaik di Indonesia. Dari makanan jalanan yang lezat hingga restoran mewah.'
            ];

            const jumbotronDesc = $('.jumbotron-description');
            const randomDesc = desc[Math.floor(Math.random() * desc.length)];
            jumbotronDesc.html(randomDesc);
        }

        const renderList = async (datas) => {
            datas = datas || await this._restaurants.getAllData();
            const { restaurants } = datas
            this._restaurantListElementHandler.removeAll()
            restaurants.forEach((value) => {
                const restaurantCard = new RestaurantCard('#card-template');
                const newCard = restaurantCard.makeCard(value);
                this._restaurantListElementHandler.appendCard(newCard);
            })
        }

        const listenSearch = () => {
            const searchInput = $('.search-bar [name=search-resto]')

            const searchAction = async (keyword) => {
                const result = await this._restaurants.getByKeyword(keyword)
                if (result.founded > 0) {
                    renderList(result)
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

            searchInput.off('keypress')
            searchInput.on('keypress', function (event) {
                if (event.key === 'Enter') {
                    const keyword = $(this).val();
                    searchAction(keyword)
                }
            });

            $('.search-bar [name=search-resto-submit-btn]').off('click')
            $('.search-bar [name=search-resto-submit-btn]').on('click', function (event) {
                const keyword = searchInput.val()
                searchAction(keyword)
            });
        }


        randomizeJumbotronContent()
        await renderList()
        listenSearch()
    }
}

export { HomeController }