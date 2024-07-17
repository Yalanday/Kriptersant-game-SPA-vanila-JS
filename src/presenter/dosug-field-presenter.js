import {render, replace, remove} from "../framework/render";
import {DosugSelectedView} from "../view/head-field/dosug-selected-view";
import {DosugFieldView} from "../view/head-field/dosug-field-view";
import {addOverlay, removeOverlay} from "../utils/utils";

export default class DosugFieldPresenter {
  #element = null;
  #container = null;

  #dosugSelectElement = null;


  constructor(container) {
    this.#container = container;
  }

  init() {
    this.#element = new DosugFieldView;
    render(this.#element, this.#container.element);
    this.#element.setDosugFieldHandler(this.#handleDosugField);
  }

  #handleDosugField = () => {
    this.#dosugSelectElement = new DosugSelectedView();
    render(this.#dosugSelectElement, this.#container.element);
    this.#dosugSelectElement.setDosugCloseBtnHandler(this.#handleCloseBtnDosugSelect);
    this.#dosugSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectDosug);
    // this.#bankSelectElement.setSelectCarHandler(this.#handleSelectCar);
    addOverlay();
  }

  #handleCloseBtnDosugSelect = () => {
    remove(this.#dosugSelectElement);
    this.#element.setDosugFieldHandler(this.#handleDosugField);
    removeOverlay();
  }

  #onEscKeyDownForSelectDosug = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#dosugSelectElement);
      this.#element.setDosugFieldHandler(this.#handleDosugField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectDosug);
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
