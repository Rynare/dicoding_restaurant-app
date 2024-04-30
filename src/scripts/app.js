import UrlParser from "./routes/link-parser/url-parser.js";
import { compareUrlWithPattern } from "./routes/router.js";
import { routes } from "./routes/web.js";
import { renderView } from "./utils/view-helper.js";

class App {
  static mainContent = document.querySelector("#app-content");

  static isReady = false;

  constructor({ hamburger, drawer, content }) {
    if (App.isReady) {
      throw new Error("Anda hanya bisa membuat 1 instance app");
    } else {
      this._hamburger = hamburger;
      this._drawer = drawer;
      this._content = content;

      App.isReady = true;

      this._listenDrawer();
      this._listenTabIndex();
      App.mainContent = content;
    }
  }

  async renderPage() {
    const rawCurrentPath = window.location.hash || "/";
    // pecah hash menjadi segment
    const pathSplit = UrlParser.urlSplitter(rawCurrentPath);
    const currentPath = `/${pathSplit.join("/")}`;
    // mencari rute dengan mencocokkan awalan pattern dengan awalan url, dan berdasarkan panjang segmen url & segmen pattern
    let filteredRoutes = routes.filter((cursor) => `${currentPath}/`.startsWith(`${cursor.startWith}/`) && pathSplit.length === cursor.request.segment.length);
    let doAction = null;

    if (filteredRoutes.length === 1) {
      doAction = filteredRoutes[0].action;
    } else if (filteredRoutes.length >= 2) {
      filteredRoutes = routes.filter((cursor) => compareUrlWithPattern(currentPath, cursor.pattern));
      // Jika tetap 2 maka throw error
      if (filteredRoutes.length >= 2) {
        console.error(`Multiple routes: \n\t${filteredRoutes.map((cursor) => `'${cursor.pattern}'`).join(",\n\t")}`);
        throw new Error("Multiple matching routes found.");
      }
      doAction = filteredRoutes[0].action;
    } else {
      doAction = () => renderView("/pages/404.html");
    }
    doAction();
    if (filteredRoutes[0].request.parameter.length > 0) {
      filteredRoutes[0].request.putParameter();
    }
  }

  _listenTabIndex() {
    document.addEventListener("keydown", (event) => {
      const { activeElement } = document;
      const isEditable = activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA";
      if (activeElement === event.target && this._isElementVisible(activeElement)) {
        if (
          (event.keyCode === 13 || event.keyCode === 32)
          && activeElement.tabIndex >= 0 && !isEditable
        ) {
          event.preventDefault();
          event.target.click();
        }
      }
    });
  }

  _listenDrawer() {
    const toggle = (event) => {
      event.stopPropagation();

      if (!event.target.closest(this._getSelector(this._drawer))) {
        this._drawer.classList.toggle("active");
        if (this._drawer.classList.contains("active")) { document.addEventListener("click", toggle); } else { document.removeEventListener("click", toggle); }
      }
    };

    this._hamburger.addEventListener("click", toggle);
  }

  _getSelector(element) {
    let theElement = element;
    if (!theElement) return;
    let selector = "";
    while (theElement.parentNode) {
      if (theElement.id) {
        selector = `#${theElement.id} ${selector}`;
        break;
      } else {
        let sibCount = 0;
        let sibIndex = 0;
        const nodeName = theElement.nodeName.toLowerCase();
        let sibling = theElement.previousSibling;
        while (sibling) {
          if (sibling.nodeType === 1 && sibling.nodeName.toLowerCase() === nodeName) {
            sibCount++;
          }
          sibling = sibling.previousSibling;
        }
        sibling = theElement.nextSibling;
        while (sibling) {
          if (sibling.nodeType === 1 && sibling.nodeName.toLowerCase() === nodeName) {
            if (++sibIndex === sibCount) {
              break;
            }
          }
          sibling = sibling.nextSibling;
        }
        if (sibIndex > 0) {
          selector = `:${nodeName}nth-child(${sibIndex + 1}) ${selector}`;
        } else {
          selector = nodeName + selector;
        }
        theElement = theElement.parentNode;
      }
    }
    return selector.trim();
  }

  _isElementVisible(el) {
    const rect = el.getBoundingClientRect();
    let isVisible = (
      rect.top >= 0
      && rect.left >= 0
      && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

    const computedStyle = window.getComputedStyle(el);
    if (
      computedStyle.getPropertyValue("visibility") === "hidden"
      || computedStyle.getPropertyValue("display") === "none"
      || computedStyle.getPropertyValue("opacity") === "0"
    ) {
      isVisible = false;
    }

    return isVisible;
  }
}

export { App };
