import AbstractView from '../../framework/view/abstract-view';
import {createBankFieldTemplate} from "./templates/create-bank-field-template";
export class BankFieldView extends AbstractView {


  constructor() {
    super();
  }

  setBankFieldHandler(callback) {
    this._callback.BankFieldHandler = callback;
    this.element.addEventListener("click", this.#BankFieldHandler);
  }

  #BankFieldHandler = () => {
    this._callback.BankFieldHandler();
  }

  get template() {
    return createBankFieldTemplate();
  }
}
