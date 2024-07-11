import AbstractView from '../../framework/view/abstract-view';
import {createBankSelectTemplate} from "./templates/create-bank-select-template";

export class BankSelectedView extends AbstractView {

  constructor() {
    super();
  }

  setBankSelectHandler(callback) {
    this._callback.bankSelectClickHandler = callback;
    this.element.addEventListener('click', this.#bankSelectClickHandler);
  }

  setBankCloseBtnHandler(callback) {
    this._callback.closeCarBtnClickHandler = callback;
    this.element.querySelector('.head-field__close-work-select').addEventListener('click', this.#closeCarBtnClickHandler);
  }

  setEscKeydownHandler(callback) {
    this._callback.escKeydownBankSelectHandler = callback;
    document.addEventListener('keydown', this.#escKeydownBankSelectHandler);
  }


  #closeCarBtnClickHandler = (evt) => {
    this._callback.closeCarBtnClickHandler();
  }


  #bankSelectClickHandler = (evt) => {
    if (evt.target.classList.contains('work-select-field')) {
      this._callback.bankSelectClickHandler(evt.target);
    }
  }

  #escKeydownBankSelectHandler = (evt) => {
    this._callback.escKeydownBankSelectHandler(evt);
  }


  get template() {
    return createBankSelectTemplate();
  }
}
