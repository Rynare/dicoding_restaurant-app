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
        this._linkElement.style.color = 'inherit'
        this._linkElement.style.textDecoration = 'inherit'
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.appendChild(this._linkElement)
        this._linkElement.innerText = this._innerText
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'href') {
            this._linkElement.setAttribute(name, `#${newValue}`)
        } else {
            this._linkElement.setAttribute(name, newValue)
        }
        this.render()
    }
}
customElements.define("link-component", LinkComponent);