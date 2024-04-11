import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import $ from 'jquery';
import restoJSON from '../public/data/DATA.json';
import { RestaurantList } from "./RestaurantList.js";

const restaurantList = new RestaurantList('.restaurant-list', '#card-template');

document.addEventListener('DOMContentLoaded', () => {
    listenDrawer();
    listenTabIndex();
    randomizeJumbotronContent();
    renderList();
})

function listenTabIndex() {
    document.addEventListener('keydown', function (event) {
        const activeElement = document.activeElement;
        if (activeElement === event.target) {
            if (event.keyCode === 13 || event.keyCode === 32) {
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