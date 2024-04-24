class LinkRouter extends HTMLAnchorElement {
    static observedAttributes = ["href"];

    constructor() {
        super();
    }

    connectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'href' && !newValue.startsWith('/#')) {
            this.setAttribute(name, `/#${newValue}`)
        }
    }
}

customElements.define("link-router", LinkRouter, { extends: 'a' });