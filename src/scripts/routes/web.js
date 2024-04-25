import { DetailRestaurantController } from "../app/controller/DetailRestaurantController.js";
import { FavoriteRestaurantController } from "../app/controller/FavoriteRestaurantController.js";
import { HomeController } from "../app/controller/homeController.js";
import { view } from "../utils/view-helper.js";
import { router } from "./router.js";

const routes = [
    router(404, () => view('/pages/404.html')),
    router("/", [new HomeController(), 'index']),
    router("/home", [new HomeController(), 'index']),
    router("/detail/:id", [new DetailRestaurantController(), 'index']),
    router("/favorite", [new FavoriteRestaurantController(), 'index']),
];

export { routes }