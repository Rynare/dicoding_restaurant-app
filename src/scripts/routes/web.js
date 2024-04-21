import { HomeController } from "../app/controller/homeController.js";
import { view } from "../utils/view-helper.js";
import { router } from "./router.js";

const routes = [
    router(404, () => view('/pages/404.html')),
    router("/", [new HomeController(), 'index']),
    router("/home", [new HomeController(), 'index']),
    router("/favorite", () => view('/pages/favorite.html')),
];

export { routes }