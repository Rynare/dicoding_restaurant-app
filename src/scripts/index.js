import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/576.scss';
import '../styles/762.scss';
import '../styles/992px.scss';
import '../styles/1200.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import $ from 'jquery';
import restoJSON from '../public/data/DATA.json';
import { RestaurantList } from "./RestaurantList.js";
import { listenDialog } from './dialog.js';

const restaurantList = new RestaurantList('.restaurant-list', '#card-template');

document.addEventListener('DOMContentLoaded', () => {
    listenDrawer();
    listenTabIndex();
    randomizeJumbotronContent();
    renderList();
    listenSearch();
    // listenDialog();
})

function listenTabIndex() {
    document.addEventListener('keydown', function (event) {
        const activeElement = document.activeElement;
        if (activeElement === event.target && isElementVisible(activeElement)) {
            if (event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault()
                event.target.click();
            }
        }
    })
}



function listenDrawer() {
    const hamburger_btn = document.querySelector('.hamburger-btn')
    const drawer = document.querySelector('#app aside');

    const toggle = event => {
        event.stopPropagation();
        if (!event.target.closest('#app aside')) {
            drawer.classList.toggle('active');
            drawer.classList.contains('active')
                ? document.addEventListener('click', toggle)
                : document.removeEventListener('click', toggle);
        }
    }

    hamburger_btn.addEventListener('click', toggle);
}

function randomizeJumbotronContent() {
    const desc = [
        'Jelajahi kelezatan kuliner Indonesia di Food Master. Temukan berbagai restoran terbaik yang menyajikan hidangan khas dari berbagai daerah di Indonesia.',
        'Panduan lengkap Anda untuk menemukan tempat makan terbaik di Indonesia. Dari makanan jalanan yang lezat hingga restoran mewah.'
    ];

    const jumbotronDesc = $('.jumbotron-description');
    const randomDesc = desc[Math.floor(Math.random() * desc.length)];
    jumbotronDesc.html(randomDesc);
}

function renderList() {
    restaurantList.removeAll()
    restoJSON.restaurants.forEach((value) => {
        restaurantList.add(value)
    })
}

function getRestaurantByKeyword(keyword) {
    const results = restoJSON.restaurants.filter(restaurant => {
        const nameMatch = restaurant.name.toLowerCase().includes(keyword.toLowerCase());
        const cityMatch = restaurant.city.toLowerCase().includes(keyword.toLowerCase());
        const descriptionMatch = restaurant.description.toLowerCase().includes(keyword.toLowerCase());

        return nameMatch || cityMatch || descriptionMatch;
    });

    return results;
}

function listenSearch() {
    const searchInput = $('.search-bar [name=search-resto]')

    function searchAction(keyword) {
        const result = getRestaurantByKeyword(keyword)
        if (result.length > 0) {
            restaurantList.removeAll()
            result.forEach((value) => {
                restaurantList.add(value)
            })
        } else {
            restaurantList.setEmpty()
        }
    }

    searchInput.on('keypress', function (event) {
        if (event.which === 13) {
            const keyword = $(this).val();
            searchAction(keyword)

        }
    });
    $('.search-bar [name=search-resto-submit-btn]').on('click', function (event) {
        const keyword = searchInput.val()
        searchAction(keyword)
    });
}

function isElementVisible(el) {
    var rect = el.getBoundingClientRect();
    var isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

    var computedStyle = window.getComputedStyle(el);
    if (
        computedStyle.getPropertyValue('visibility') === 'hidden' ||
        computedStyle.getPropertyValue('display') === 'none' ||
        computedStyle.getPropertyValue('opacity') === '0'
    ) {
        isVisible = false;
    }

    return isVisible;
}