import AbstractView from '../../framework/view/abstract-view';
import {createCryptoSelectTemplate} from "./templates/create-crypto-select-template";

export class CryptoSelectedView extends AbstractView {

  #configChart = null;

  constructor(configChart) {
    super();
    this.#configChart = configChart;
  }

  setSelectCryptoHandler(callback) {
    this._callback.cryptoSelectClickHandler = callback;
    this.element.querySelectorAll('.work-select-field').forEach((el) => {
      el.addEventListener('click', this.#cryptoSelectClickHandler)
    });
  }

  #cryptoSelectClickHandler = (evt) => {
    let price = evt.target.dataset.price;
    let sale = evt.target.dataset.sale;
    let type = evt.target.dataset.type;
    console.log(type)
    this._callback.cryptoSelectClickHandler(evt, price, sale, type);
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

  #escKeydownCryptoSelectHandler = (evt) => {
    this._callback.escKeydownCryptoSelectHandler(evt);
  }


  get template() {
    return createCryptoSelectTemplate(this.#configChart);
  }
}
