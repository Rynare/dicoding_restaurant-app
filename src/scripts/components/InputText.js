class InputText extends HTMLInputElement {
    constructor() {
        super();
        this.addEventListener('input', this.handleValueChange.bind(this));
    }

    static get observedAttributes() {
        return ['type', 'minlength', 'maxlength', 'pattern'];
    }

    connectedCallback() {
        if (!this.getAttribute('type')) {
            this.setAttribute('type', 'text');
        }
    }

    handleValueChange() {
        this.value = this.value.trimStart()
        if (!(this.isValidLength() && this.isValidPattern())) {
            this.classList.add('is-invalid')
            this.classList.remove('is-valid')
        } else {
            this.classList.add('is-valid')
            this.classList.remove('is-invalid')
        }
    }

    isValidLength() {
        if (this.required && this.value === '') return false;
        const isValidMinLength = this.value.length >= this.minLength;
        const isValidMaxLength = this.maxLength <= 0 ? true : this.value.length <= this.maxLength;
        const valid = isValidMinLength && isValidMaxLength
        return valid;
    }

    isValidPattern() {
        if (!this.pattern) return true;
        if (!this.required && this.value === '') return true;
        // method slice untuk menghilangkan '/' diawal dan akhir pattern
        const alphanumericRegex = new RegExp(this.pattern.slice(1, -1));
        return alphanumericRegex.test(this.value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (['minlength', 'maxlength', 'pattern'].includes(name)) {
            if (name == 'maxlength' && (this.maxLength <= 0)) {
                this.removeAttribute(name)
            } else if (name == 'minlength' && (this.maxLength > 0 && this.minLength > this.maxLength)) {
                this.removeAttribute(name)
            }
            this.handleValueChange()
        } else if (name == 'type' && this.type !== 'text') {
            this.setAttribute('type', 'text');
        }
    }
}

customElements.define('input-text', InputText, { extends: 'input' });
