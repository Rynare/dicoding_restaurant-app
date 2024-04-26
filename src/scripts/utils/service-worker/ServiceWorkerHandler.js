import workBoxServiceWorker from "./WorkBoxServiceWorker.js";

window.addEventListener("load", () => {
  workBoxServiceWorker("./workBoxServiceWorker.js");
});
