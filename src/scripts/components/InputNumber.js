class InputNumber extends HTMLInputElement {
  constructor() {
    super();
    this.addEventListener("input", this.handleValueChange.bind(this));
  }

  static get observedAttributes() {
    return ["type", "min", "max"];
  }

  // eslint-disable-next-line
  attributeChangedCallback(name, oldValue, newValue) {
    const isThis = (value) => value === name;
    if (["min", "max", "pattern"].includes(name)) {
      if (isThis("min") && (this.min > this.max)) {
        this.removeAttribute(name);
      }
      this.handleValueChange();
    } else if (isThis("type") && this.type !== "number") {
      this.setAttribute("type", "number");
    }
  }

  connectedCallback() {
    if (!this.getAttribute("type")) {
      this.setAttribute("type", "number");
    }
  }

  handleValueChange(event) {
    this.value = this.value.trimStart();
    if (!(this.isValidValue())) {
      event.preventDefault();
      this.classList.add("is-invalid");
      this.classList.remove("is-valid");
    } else {
      this.classList.add("is-valid");
      this.classList.remove("is-invalid");
    }
  }

  isValidValue() {
    const isValidMin = this.value >= this.min;
    const isValidMax = this.value <= this.max;
    const valid = isValidMin && isValidMax;
    return valid;
  }
}

customElements.define("input-number", InputNumber, { extends: "input" });
