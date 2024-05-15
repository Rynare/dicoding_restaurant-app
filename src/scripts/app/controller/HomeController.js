import $ from "jquery";
import { swalNotify } from "../../swal.js";
import { RestaurantList } from "../../web-components/RestaurantList.js";
import { RestaurantCard } from "../../web-components/RestaurantCard.js";
import { RestaurantsApi } from "../../data/RestaurantsApi.js";
import { Controller } from "./Controller.js";

class HomeController extends Controller {
  constructor() {
    super();
    this._restaurantList = null;
  }

  async index() {
    await this.view("/pages/home.html");
    this._restaurantList = new RestaurantList(".restaurant-list");

    const { getAllData, getByKeyword } = RestaurantsApi;

    function randomizeJumbotronContent() {
      const desc = [
        "Jelajahi kelezatan kuliner Indonesia di Food Master. Temukan berbagai restoran terbaik yang menyajikan hidangan khas dari berbagai daerah di Indonesia.",
        "Panduan lengkap Anda untuk menemukan tempat makan terbaik di Indonesia. Dari makanan jalanan yang lezat hingga restoran mewah.",
      ];

      const jumbotronDesc = $(".jumbotron-description");
      const randomDesc = desc[Math.floor(Math.random() * desc.length)];
      jumbotronDesc.html(randomDesc);
    }

    const renderList = async (objectData) => {
      try {
        const datas = objectData || await getAllData();
        const { restaurants } = datas;
        this._restaurantList.removeAll();
        restaurants.forEach((value) => {
          try {
            const restaurantCard = new RestaurantCard();
            const newCard = restaurantCard.makeCard(value);
            this._restaurantList.appendCard(newCard);
          } catch (error) {
            console.error(error);
          }
        });
      } catch (error) {
        swalNotify({
          icon: "error",
          title: "Error!",
          text: "Gagal mendapatkan data dari server",
        });
        console.error("gagal mengambil data dari server:", error);
      }
    };

    const listenSearch = () => {
      const searchInput = $(".search-bar [name=search-resto]");

      const searchAction = async (keyword) => {
        try {
          const result = await getByKeyword(keyword);
          if (result.founded > 0) {
            renderList(result);
          } else {
            swalNotify({
              title: "Upps...",
              text: "Data tidak ditemukan.",
              icon: "error",
              timer: 2000,
            });
            this._restaurantList.noData();
          }
        } catch (error) {
          swalNotify({
            icon: "error",
            title: "Error!",
            text: "Gagal mendapatkan data dari server",
          });
          console.error("gagal mengambil data dari server:", error);
        }
      };

      searchInput.off("keypress");
      searchInput.on("keypress", function searchEvent(event) {
        if (event.key === "Enter") {
          const keyword = $(this).val();
          searchAction(keyword);
        }
      });

      $(".search-bar [name=search-resto-submit-btn]").off("click");
      $(".search-bar [name=search-resto-submit-btn]").on("click", () => {
        const keyword = searchInput.val();
        searchAction(keyword);
      });
    };

    randomizeJumbotronContent();
    await renderList();
    listenSearch();
  }
}

export { HomeController };
