import {render, replace, remove} from "../framework/render";
import {HomeFieldView} from "../view/head-field/home-field-view";
import {HomeSelectedView} from "../view/head-field/home-selected-view";


export default class HomeFieldPresenter {
  #element = null;
  #container = null;

  #homeSelectElement = null;


  constructor(container) {
    this.#container = container;
  }

  init() {
    this.#element = new HomeFieldView;
    render(this.#element, this.#container.element);
    this.#element.setHomeFieldHandler(this.#handleHomeField);
  }

  #handleHomeField = () => {
    this.#homeSelectElement = new HomeSelectedView();
    render(this.#homeSelectElement, this.#container.element);
    this.#homeSelectElement.setHomeCloseBtnHandler(this.#handleCloseBtnHomeSelect);
    this.#homeSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectHome);
    // this.#bankSelectElement.setSelectCarHandler(this.#handleSelectCar);
  }

  #handleCloseBtnHomeSelect = () => {
    remove(this.#homeSelectElement);
    this.#element.setHomeFieldHandler(this.#handleHomeField);
  }

  #onEscKeyDownForSelectHome = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#homeSelectElement);
      this.#element.setHomeFieldHandler(this.#handleHomeField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectHome);
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
