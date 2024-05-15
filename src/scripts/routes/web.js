import { DetailRestaurantController } from "../app/controller/DetailRestaurantController.js";
import { FavoriteRestaurantsController } from "../app/controller/FavoriteRestaurantsController.js";
import { TestController } from "../app/controller/TestController.js";
import { HomeController } from "../app/controller/homeController.js";
import { renderView } from "../utils/view-helper.js";
import { router } from "./router.js";

const routes = [
  router(404, () => renderView("/pages/404.html")),
  router("/", [new HomeController(), "index"]),
  router("/home", [new HomeController(), "index"]),
  router("/detail/:id", [new DetailRestaurantController(), "index"]),
  router("/favorites", [new FavoriteRestaurantsController(), "index"]),
  router("/test", [new TestController(), "index"]),
];

export { routes };
