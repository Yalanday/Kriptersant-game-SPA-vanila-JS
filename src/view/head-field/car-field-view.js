import AbstractView from '../../framework/view/abstract-view';
import {createCarFieldTemplate} from "./templates/create-car-field-template";
export class CarFieldView extends AbstractView {
  #car = null

  constructor(car = "Тапочки") {
    super();
    this.#car = car;
  }

  setCarFieldHandler(callback) {
    this._callback.carFieldClickHandler = callback;
    this.element.addEventListener("click", this.#carFieldClickHandler);
  }

  #carFieldClickHandler = () => {
    this._callback.carFieldClickHandler();
  }

  get template() {
    return createCarFieldTemplate(this.#car);
  }
}
