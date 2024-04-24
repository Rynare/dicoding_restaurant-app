import { App } from "../../app.js";
import { fetchViewAsHtml } from "../../utils/view-helper.js";

class Controller {
    static request = { parameters: {} };

    static putRequestParameter(obj) {
        this.request.parameters = { ...this.request.parameters, ...obj };
    }

    static get parameters() {
        return Controller.request.parameters
    }

    constructor() {
        if (this.constructor === Controller) {
            throw new TypeError(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
        }
        this._fetchView = fetchViewAsHtml
        this._view = null
        this._appContent = document.querySelector('#app-content');
    }


    _renderPage() {
        const template = document.createElement('template');
        template.innerHTML = this._view;

        this._view = template.content.cloneNode(true);

        App.mainContent.innerHTML = '';
        App.mainContent.appendChild(this._view);

        document.body.scroll(0, 0)
    }
}

export { Controller }