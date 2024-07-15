import {render, replace, remove} from "../framework/render";
import {ExpensesCarFieldView} from "../view/head-field/car-expenses-field-view";
import {CarSelectedView} from "../view/head-field/car-selected-view";
import {dataCar} from "../mock/data-car";

export default class CarFieldPresenter {
  #element = null;
  #container = null;
  #dataUser= null;
  #dataCar = dataCar;
  #MinusAllMoney = null;
  #setterCarForDataUser = null;
  #setCreditItemCarCreditValue = null;

  #carSelectElement = null;

  constructor(dataUser, container, minusAllMoney, setterCarForDataUser, setCreditItemCarCreditValue) {
    this.#dataUser = dataUser;
    this.#container = container;
    this.#MinusAllMoney = minusAllMoney;
    this.#setterCarForDataUser = setterCarForDataUser;
    this.#setCreditItemCarCreditValue = setCreditItemCarCreditValue;
  }

  init() {
    this.#element = new ExpensesCarFieldView;
    render(this.#element, this.#container.element);
    this.#element.setCarFieldHandler(this.#handleCarField);
  }

  #handleCarField = () => {
    this.#carSelectElement = new CarSelectedView(this.#dataUser(), this.#dataCar);
    render(this.#carSelectElement, this.#container.element);
    this.#carSelectElement.setCarCloseBtnHandler(this.#handleCloseBtnCarSelect);
    this.#carSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectCar);
    this.#carSelectElement.setSelectCarHandler(this.#handleSelectCar);
  }

  #handleCloseBtnCarSelect = () => {
    remove(this.#carSelectElement);
    this.#element.setCarFieldHandler(this.#handleCarField);
  }

  #onEscKeyDownForSelectCar = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#carSelectElement);
      this.#element.setCarFieldHandler(this.#handleCarField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectCar);
    }
  };

  #handleSelectCar = (evt) => {

    remove(this.#carSelectElement);
    this.#element.setCarFieldHandler(this.#handleCarField);
    let newElement = new ExpensesCarFieldView(evt.dataset.model);
    replace(newElement, this.#element);
    this.#element = newElement;
    this.#element.setCarFieldHandler(this.#handleCarField);
    this.#MinusAllMoney(Number(evt.dataset.price));
    this.#setterCarForDataUser('car', evt.dataset.model);
    this.#setterCarForDataUser('carCredit', +evt.dataset.expenses);
    this.#setCreditItemCarCreditValue();
    console.log(this.#dataUser())

  }
}