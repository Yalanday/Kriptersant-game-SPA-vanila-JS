import {render, replace, remove} from "../framework/render";
import {HomeFieldView} from "../view/head-field/home-field-view";
import {HomeSelectedView} from "../view/head-field/home-selected-view";
import {dataHome} from "../mock/data-home";
import {addOverlay, removeOverlay} from "../utils/utils";


export default class HomeFieldPresenter {
  #element = null;
  #container = null;
  #dataUser = null;
  #dataHome = dataHome;
  #minusAllMoney = null;
  #setterHomeForDataUser = null;
  #setCreditItemHomeCreditValue = null;

  #homeSelectElement = null;


  constructor(dataUser, container, minusAllMoney, setterHomeForDataUser, setCreditItemHomeCreditValue) {
    this.#dataUser  = dataUser;
    this.#container = container;
    this.#minusAllMoney = minusAllMoney;
    this.#setterHomeForDataUser = setterHomeForDataUser;
    this.#setCreditItemHomeCreditValue = setCreditItemHomeCreditValue;
  }

  init() {
    this.#element = new HomeFieldView;
    render(this.#element, this.#container.element);
    this.#element.setHomeFieldHandler(this.#handleHomeField);
  }

  #handleHomeField = () => {
    this.#homeSelectElement = new HomeSelectedView(this.#dataUser(), this.#dataHome, this.#minusAllMoney);
    render(this.#homeSelectElement, this.#container.element);
    this.#homeSelectElement.setHomeCloseBtnHandler(this.#handleCloseBtnHomeSelect);
    this.#homeSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectHome);
    this.#homeSelectElement.setHomeSelectHandler(this.#handleSelectHome);
    addOverlay();
  }

  #handleCloseBtnHomeSelect = () => {
    remove(this.#homeSelectElement);
    this.#element.setHomeFieldHandler(this.#handleHomeField);
    removeOverlay();
  }

  #onEscKeyDownForSelectHome = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#homeSelectElement);
      this.#element.setHomeFieldHandler(this.#handleHomeField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectHome);
      removeOverlay();
    }
  };

  #handleSelectHome = (evt) => {

    remove(this.#homeSelectElement);
    this.#element.setHomeFieldHandler(this.#handleHomeField);
    let newElement = new HomeFieldView(evt.dataset.model);
    replace(newElement, this.#element);
    this.#element = newElement;
    this.#element.setHomeFieldHandler(this.#handleHomeField);
    this.#minusAllMoney(Number(evt.dataset.price));
    this.#setterHomeForDataUser('home', evt.dataset.model);
    this.#setterHomeForDataUser('homeCredit', +evt.dataset.expenses);
    this.#setCreditItemHomeCreditValue();
    removeOverlay();

    console.log(this.#dataUser())

  }
}
