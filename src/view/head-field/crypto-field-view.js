import AbstractView from '../../framework/view/abstract-view';
import {createCryptoFieldTemplate} from "./templates/create-crypto-field-template";
export class CryptoFieldView extends AbstractView {


  constructor() {
    super();
  }

  setCryptoFieldHandler(callback) {
    this._callback.cryptoFieldHandler = callback;
    this.element.addEventListener("click", this.#cryptoFieldHandler);
  }

  #cryptoFieldHandler = () => {
    this._callback.cryptoFieldHandler();
  }

  get template() {
    return createCryptoFieldTemplate();
  }
}
