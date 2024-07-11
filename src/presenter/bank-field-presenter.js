import {render, replace, remove} from "../framework/render";
import {BankFieldView} from "../view/head-field/bank-field-view";
import {BankSelectedView} from "../view/head-field/bank-selected-view";

export default class BankFieldPresenter {
  #element = null;
  #container = null;

  #bankSelectElement = null;


  constructor(container) {
    this.#container = container;
  }

  init() {
    this.#element = new BankFieldView;
    render(this.#element, this.#container.element);
    this.#element.setBankFieldHandler(this.#handleBankField);
  }

  #handleBankField = () => {
    this.#bankSelectElement = new BankSelectedView();
    render(this.#bankSelectElement, this.#container.element);
    this.#bankSelectElement.setBankCloseBtnHandler(this.#handleCloseBtnBankSelect);
    this.#bankSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectCar);
    // this.#bankSelectElement.setSelectCarHandler(this.#handleSelectCar);
  }

  #handleCloseBtnBankSelect = () => {
    remove(this.#bankSelectElement);
    this.#element.setBankFieldHandler(this.#handleBankField);
  }

  #onEscKeyDownForSelectCar = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#bankSelectElement);
      this.#element.setBankFieldHandler(this.#handleBankField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectCar);
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
