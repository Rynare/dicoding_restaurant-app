import "bootstrap-icons/font/bootstrap-icons.css";

class StarRating extends HTMLElement {
  static get observedAttributes() {
    return ["rating"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._template = document.createElement("template");
    this._template.innerHTML = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            <style>
              #rating-container {
                  color: grey;
                  display: flex;
                  align-items: center;
              }

              .rating-star {
                  display: inline;
                  font-size: 13px;
                  position: relative;
                  color: #ccc;
                  position: relative;
                  margin: 0;
                  padding: 0;
                  margin-right: 5px;
              }
              
              .rating-star .fill-star {
                  color: #e7711b;
                  padding: 0;
                  position: absolute;
                  z-index: 1;
                  top: 0;
                  left: 0;
                  overflow: hidden;
                  display: inline-flex;
                  column-gap: 1px;
              }
            
              .rating-star .empty-star {
                  padding: 0;
                  display: block;
                  z-index: 0;
                  display: inline-flex;
                  column-gap: 1px;
              }
            </style>
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
    this.shadowRoot.innerHTML = "";
    const rating = this.getAttribute("rating") || 0;
    const starWidth = rating ? ((+rating || 0) / 5) * 100 + 1 : 0;
    const ratingText = this._template.content.querySelector("#rating-text");
    const fillStar = this._template.content.querySelector(".fill-star");

    fillStar.style.width = `${starWidth}%`;
    ratingText.textContent = rating;
    ratingText.setAttribute("aria-label", `restoran ini memiliki ${rating} bintang`);

    this.shadowRoot.appendChild(this._template.content.cloneNode(true));
  }

  // eslint-disable-next-line no-unused-vars
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "rating") {
      if (newValue <= 5 && newValue >= 0) {
        this.render();
      } else {
        throw new Error("Rating harus dari 0 sampai 5");
      }
    }
  }
}

customElements.define("star-rating", StarRating);
