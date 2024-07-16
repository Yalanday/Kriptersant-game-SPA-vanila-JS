import {render, replace, remove} from "../framework/render";
import {LoveFieldView} from "../view/head-field/love-field-view";
import {LoveSelectedView} from "../view/head-field/love-selected-view";
import {addOverlay, removeOverlay} from "../utils/utils";


export default class LoveFieldPresenter {
  #element = null;
  #container = null;
  #dataUser = null;

  #loveSelectElement = null;


  constructor(dataUser, container) {
    this.#dataUser = dataUser;
    this.#container = container;
  }

  init() {
    this.#element = new LoveFieldView(this.#dataUser);
    render(this.#element, this.#container.element);
    this.#element.setLoveFieldHandler(this.#handleLoveField);
  }

  #handleLoveField = () => {
    this.#loveSelectElement = new LoveSelectedView();
    render(this.#loveSelectElement, this.#container.element);
    this.#loveSelectElement.setLoveCloseBtnHandler(this.#handleCloseBtnBankSelect);
    this.#loveSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectLove);
    // this.#bankSelectElement.setSelectCarHandler(this.#handleSelectCar);
    addOverlay();
  }

  #handleCloseBtnBankSelect = () => {
    remove(this.#loveSelectElement);
    this.#element.setLoveFieldHandler(this.#handleLoveField);
    removeOverlay();
  }

  #onEscKeyDownForSelectLove = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#loveSelectElement);
      this.#element.setLoveFieldHandler(this.#handleLoveField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectLove);
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
