class RatingComponent extends HTMLElement {
    static observedAttributes = ["rating"];

    constructor() {
        super();
        this._template = document.createElement('template');
        this._template.innerHTML = `
            <div id="rating-container">
                <div class="rating-star">
                    <div class="empty-star">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                    </div>
                    <div class="fill-star">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                    </div>
                </div>
                (<span id="rating-text" tabindex="0">rating</span>)
            </div>
        `;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = ''
        const rating = this.getAttribute('rating') || 0;
        const starWidth = rating ? ((+rating || 0) / 5) * 100 + 1 : 0;
        const ratingText = this._template.content.querySelector('#rating-text');
        const fillStar = this._template.content.querySelector('.fill-star');

        fillStar.style.width = `${starWidth}%`;
        ratingText.textContent = rating;
        ratingText.setAttribute('aria-label', `restoran ini memiliki ${rating} bintang`);

        this.appendChild(this._template.content.cloneNode(true));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'rating') {
            this.render();
        }
    }
}

customElements.define("rating-component", RatingComponent);
