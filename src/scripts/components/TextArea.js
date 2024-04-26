class TextArea extends HTMLTextAreaElement {
  constructor() {
    super();
    this.addEventListener("input", this.handleValueChange.bind(this));
  }

  static get observedAttributes() {
    return ["minlength", "maxlength", "pattern"];
  }

  handleValueChange() {
    this.value = this.value.trimStart();
    if (!(this.isValidLength() && this.isValidPattern())) {
      this.classList.add("is-invalid");
      this.classList.remove("is-valid");
    } else {
      this.classList.add("is-valid");
      this.classList.remove("is-invalid");
    }
  }

  isValidLength() {
    if (this.required && this.value === "") return false;
    const isValidMinLength = this.value.length >= this.minLength;
    const isValidMaxLength = this.maxLength <= 0 ? true : this.value.length <= this.maxLength;
    const valid = isValidMinLength && isValidMaxLength;
    return valid;
  }

  isValidPattern() {
    if (!this.pattern) return true;
    if (!this.required && this.value === "") return true;
    // method slice untuk menghilangkan '/' diawal dan akhir pattern
    const alphanumericRegex = new RegExp(this.pattern.slice(1, -1));
    return alphanumericRegex.test(this.value);
  }

  // eslint-disable-next-line no-unused-vars
  attributeChangedCallback(name, oldValue, newValue) {
    if (["minlength", "maxlength", "pattern"].includes(name)) {
      const isValidMinLength = (this.maxLength > 0 && this.minLength > this.maxLength);
      if (name === "minlength" && isValidMinLength) {
        this.removeAttribute(name);
      }
      this.handleValueChange();
    }
  }
}

customElements.define("my-textarea", TextArea, { extends: "textarea" });
