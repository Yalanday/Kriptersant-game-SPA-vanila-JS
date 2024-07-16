import {render, replace, remove} from "../framework/render";
import {CryptoFieldView} from "../view/head-field/crypto-field-view";
import {CryptoSelectedView} from "../view/head-field/crypto-selected-view";
import {addOverlay, removeOverlay} from "../utils/utils";


export default class CryptoFieldPresenter {
  #element = null;
  #container = null;

  #cryptoSelectElement = null;


  constructor(container) {
    this.#container = container;
  }

  init() {
    this.#element = new CryptoFieldView;
    render(this.#element, this.#container.element);
    this.#element.setCryptoFieldHandler(this.#handleCryptoField);
  }

  #handleCryptoField = () => {
    this.#cryptoSelectElement = new CryptoSelectedView();
    render(this.#cryptoSelectElement, this.#container.element);
    this.#cryptoSelectElement.setCryptoCloseBtnHandler(this.#handleCloseBtnCryptoSelect);
    this.#cryptoSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectCrypto);
    // this.#bankSelectElement.setSelectCarHandler(this.#handleSelectCar);
    addOverlay();
  }

  #handleCloseBtnCryptoSelect = () => {
    remove(this.#cryptoSelectElement);
    this.#element.setCryptoFieldHandler(this.#handleCryptoField);
    removeOverlay();
  }

  #onEscKeyDownForSelectCrypto = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#cryptoSelectElement);
      this.#element.setCryptoFieldHandler(this.#handleCryptoField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectCrypto);
      removeOverlay();
    }
  };

  // #handleSelectCar = (evt) => {
  //
  //   remove(this.#carSelectElement);
  //   this.#element.setCarFieldHandler(this.#handleCarField);
  //   let newElement = new ExpensesCarFieldView(evt.dataset.model);
  //   replace(newElement, this.#element);
  //   this.#element = newElement;
  //   this.#element.setCarFieldHandler(this.#handleCarField);
  //   this.#MinusAllMoney(Number(evt.dataset.price));
  //   this.#setterCarForDataUser('car', evt.dataset.model);
  //   console.log(this.#dataUser())
  //
  // }
}
