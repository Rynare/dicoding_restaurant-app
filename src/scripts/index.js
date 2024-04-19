import 'regenerator-runtime'; /* for async await transpile */
import $ from 'jquery';
import { listenDialog } from './dialog.js';
import { RestaurantListElementHandler } from './utils/restaurant/RestaurantListElementHandler.js';
import { RestaurantCard } from './utils/restaurant/RestaurantCard.js';
import { Restaurants } from './utils/restaurant/Restaurants.js';
import { swalNotify } from "./swal.js";

// RestaurantList menggunakan JQuery untuk mendapatkan element
const restaurantListElementHandler = new RestaurantListElementHandler('.restaurant-list');
const restaurants = new Restaurants();

document.addEventListener('DOMContentLoaded', () => {
    randomizeJumbotronContent();
    renderList();
    listenSearch();
    // listenDialog();
})

function randomizeJumbotronContent() {
    const desc = [
        'Jelajahi kelezatan kuliner Indonesia di Food Master. Temukan berbagai restoran terbaik yang menyajikan hidangan khas dari berbagai daerah di Indonesia.',
        'Panduan lengkap Anda untuk menemukan tempat makan terbaik di Indonesia. Dari makanan jalanan yang lezat hingga restoran mewah.'
    ];

    const jumbotronDesc = $('.jumbotron-description');
    const randomDesc = desc[Math.floor(Math.random() * desc.length)];
    jumbotronDesc.html(randomDesc);
}

function renderList(datas = restaurants.getAllData()) {
    restaurantListElementHandler.removeAll()
    datas.forEach((value) => {
        const restaurantCard = new RestaurantCard('#card-template');
        const newCard = restaurantCard.makeCard(value);
        restaurantListElementHandler.appendCard(newCard);
    })
}

function listenSearch() {
    const searchInput = $('.search-bar [name=search-resto]')

    function searchAction(keyword) {
        const result = restaurants.getByKeyword(keyword)
        if (result.length > 0) {
            renderList(result)
        } else {
            swalNotify({
                title: 'Upps...',
                text: 'Data tidak ditemukan.',
                icon: 'error',
                timer: 2000
            })
            restaurantListElementHandler.noData()
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

