import { route } from "../routes/router.js";

class LinkComponent extends HTMLElement {
    static observedAttributes = [
        "href",
        "target",
    ];

    constructor() {
        super();
        this._innerText = this.innerText
        this.innerText = ''
        this._linkElement = document.createElement('a')
    }

    connectedCallback() {
        this.render()
        this._addClick()
    }

    render() {
        this.appendChild(this._linkElement)
        this._linkElement.innerText = this._innerText
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._linkElement.setAttribute(name, newValue)
        this.render()
    }

    _addClick() {
        this.querySelector('a').addEventListener('click', route)
    }
}
customElements.define("link-component", LinkComponent);