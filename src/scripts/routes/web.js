import { Controller } from "../app/controller/Controller.js";
import { HomeController } from "../app/controller/homeController.js";
import { view } from "../utils/view-helper.js";
import { router } from "./router.js";

const routes = [
    router(404, await view("/pages/404.html")),
    router("/", new HomeController()),
];

export { routes }