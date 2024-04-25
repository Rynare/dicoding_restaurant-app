class LikeButton extends HTMLButtonElement {

    static observedAttributes = ['is-active']

    constructor() {
        super()
    }

    connectedCallback() {
        const hasChildren = ((document.querySelectorAll(':is(.active,.inactive)') || '').length == 2) ? true : false
        if (!hasChildren) {
            console.error('Like button harus memiliki 2 children dengan class active dan inactive')
        }
        if (!this.hasAttribute('is-active')) {
            this.setAttribute('is-active', false);
        }
        this.addEventListener('click', () => {
            const isActive = this.getAttribute('is-active') === 'true';
            this.setAttribute('is-active', String(!isActive));
        });
    }

    buttonSwitcher() {
        const isActive = this.getAttribute('is-active') == 'true'
        if (isActive) {
            this.querySelector('.active').style.display = 'inline'
            this.querySelector('.inactive').style.display = 'none'
        } else {
            this.querySelector('.active').style.display = 'none'
            this.querySelector('.inactive').style.display = 'inline'
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'is-active' && newValue != oldValue) {
            this.buttonSwitcher()
        }
    }
}
customElements.define('switch-button', LikeButton, { extends: 'button' })