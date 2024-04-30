import { renderView } from "../../utils/view-helper.js";

class Controller {
  static request = { parameters: {} };

  static putRequestParameter(obj) {
    this.request.parameters = { ...this.request.parameters, ...obj };
  }

  static get parameters() {
    return Controller.request.parameters;
  }

  constructor() {
    if (this.constructor === Controller) {
      throw new TypeError(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
    }
  }

  async view(viewUrl) {
    await renderView(viewUrl);
  }
}

export { Controller };
