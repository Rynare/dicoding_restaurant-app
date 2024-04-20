class Controller {
    constructor() {
        if (this.constructor === Controller) {
            throw new TypeError(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
        }

    }
}

export { Controller }