import AbstractView from '../../framework/view/abstract-view';
import {createCryptoSelectTemplate} from "./templates/create-crypto-select-template";

export class CryptoSelectedView extends AbstractView {

  constructor() {
    super();
  }

  setCryptoSelectHandler(callback) {
    this._callback.cryptoSelectClickHandler = callback;
    this.element.addEventListener('click', this.#cryptoSelectClickHandler);
  }

  setCryptoCloseBtnHandler(callback) {
    this._callback.closeCryptoBtnClickHandler = callback;
    this.element.querySelector('.head-field__close-work-select').addEventListener('click', this.#closeCryptoBtnClickHandler);
  }

  setEscKeydownHandler(callback) {
    this._callback.escKeydownCryptoSelectHandler = callback;
    document.addEventListener('keydown', this.#escKeydownCryptoSelectHandler);
  }

  #closeCryptoBtnClickHandler = (evt) => {
    this._callback.closeCryptoBtnClickHandler();
  }


  #cryptoSelectClickHandler = (evt) => {
    if (evt.target.classList.contains('work-select-field')) {
      this._callback.cryptoSelectClickHandler(evt.target);
    }
  }

  #escKeydownCryptoSelectHandler = (evt) => {
    this._callback.escKeydownCryptoSelectHandler(evt);
  }


  get template() {
    return createCryptoSelectTemplate();
  }
}
