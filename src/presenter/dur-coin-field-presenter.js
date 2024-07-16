import {render, replace, remove} from "../framework/render";
import {DurCoinFieldView} from "../view/head-field/dur-coin-field-view";
import {DurCoinSelectedView} from "../view/head-field/dur-coin-selected-view";
import {addOverlay, removeOverlay} from "../utils/utils";

export default class DurCoinFieldPresenter {
  #element = null;
  #dataUser = null;
  #container = null;
  #setCurrentPropertyUser = null;
  #setDebitItemDurCoinFieldValue = null;

  #durCoinSelectElement = null;


  constructor(dataUser, container, setCurrentPropertyUser, setDebitItemDurCoinFieldValue) {
    this.#dataUser = dataUser;
    this.#container = container;
    this.#setCurrentPropertyUser = setCurrentPropertyUser;
    this.#setDebitItemDurCoinFieldValue = setDebitItemDurCoinFieldValue;
  }

  init() {
    this.#element = new DurCoinFieldView;
    render(this.#element, this.#container.element);
    this.#element.setDurCoinFieldHandler(this.#handleDurCoinField);
  }

  #handleDurCoinField = () => {
    this.#durCoinSelectElement = new DurCoinSelectedView;
    render(this.#durCoinSelectElement, this.#container.element);
    this.#durCoinSelectElement.setDurCoinCloseBtnHandler(this.#handleCloseBtnDurCoinSelect);
    this.#durCoinSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectDurCoin);
    addOverlay();
    this.#durCoinSelectElement.setDurCoinSelectHandler(this.#handleSelectDurCoin);
  }

  #handleCloseBtnDurCoinSelect = () => {
    remove(this.#durCoinSelectElement);
    this.#element.setDurCoinFieldHandler(this.#handleDurCoinField);
    removeOverlay();
  }

  #onEscKeyDownForSelectDurCoin = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#durCoinSelectElement);
      this.#element.setDurCoinFieldHandler(this.#handleDurCoinField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectDurCoin);
      removeOverlay();
    }
  };

  #handleSelectDurCoin = (evt, countCoin) => {
    let newValueDurCoin = +this.#dataUser().durCoin + 1;
    this.#setCurrentPropertyUser('durCoin', +newValueDurCoin);
    this.#setDebitItemDurCoinFieldValue();
  }
}
