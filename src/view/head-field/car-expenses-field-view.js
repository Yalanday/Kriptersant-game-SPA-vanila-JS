import AbstractView from '../../framework/view/abstract-view';
import {createCarExpensesFieldTemplate} from "./templates/create-car-expenses-field-template";
export class ExpensesCarFieldView extends AbstractView {
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
    return createCarExpensesFieldTemplate(this.#car);
  }
}
