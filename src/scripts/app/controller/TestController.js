import { fetchViewAsHtml } from "../../utils/view-helper.js";
import { Controller } from "./Controller.js";

class TestController extends Controller {
  constructor() {
    super();
  }

  async index() {
    // document.head.innerHTML = "";
    const gg = await fetchViewAsHtml("/pages/testing.html");
    document.body.innerHTML = gg;
    // document.head.innerHTML += "<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css\">";
    // const like = new FavButton({
    //   container: document.querySelector(".fav-btn-wrapper"),
    //   restaurantData: { id: 1 },
    // });

    // like.render().addClickEvent();
  }
}

export { TestController };
