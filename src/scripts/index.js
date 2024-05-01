import "regenerator-runtime"; /* for async await transpile */
import { App } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = new App({
    hamburger: document.querySelector(".hamburger-btn"),
    drawer: document.querySelector("#app aside"),
    content: document.querySelector("#app-content"),
  });

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });

  window.addEventListener("load", async () => {
    await app.renderPage();
  });
});
