import AbstractView from '../../framework/view/abstract-view';
import {createCarFieldTemplate} from "./templates/create-car-field-template";
export class CarFieldView extends AbstractView {
  #dataUser = null

  constructor(dataUser) {
    super();
    this.#dataUser = dataUser;
  }

  setCarFieldHandler(callback) {
    this._callback.carFieldClickHandler = callback;
    this.element.addEventListener("click", this.#carFieldClickHandler);
  }

  #carFieldClickHandler = () => {
    this._callback.carFieldClickHandler();
  }

  get template() {
    return createCarFieldTemplate(this.#dataUser);
  }
}
