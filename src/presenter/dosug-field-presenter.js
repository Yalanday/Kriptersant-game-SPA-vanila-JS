import {render, replace, remove} from "../framework/render";
import {DosugSelectedView} from "../view/head-field/dosug-selected-view";
import {DosugFieldView} from "../view/head-field/dosug-field-view";
import {addOverlay, removeOverlay} from "../utils/utils";

export default class DosugFieldPresenter {
  #dataUser = null;
  #element = null;
  #container = null;
  #setCurrentPropertyUser = null;
  #setStatisticMinusAllMoneyForCryptoBit = null;
  #setdevItemBookFieldValue = null;
  #setdevItemSportFieldValue = null;
  #setdevItemCarmaFieldValue = null;
  #setdevItemProgerFieldValue = null;

  #dosugSelectElement = null;

  constructor(container, dataUser, setCurrentPropertyUser, setStatisticMinusAllMoneyForCryptoBit, setdevItemBookFieldValue, setdevItemSportFieldValue, setdevItemCarmaFieldValue, setdevItemProgerFieldValue) {
    this.#container = container;
    this.#dataUser = dataUser;
    this.#setCurrentPropertyUser = setCurrentPropertyUser;
    this.#setStatisticMinusAllMoneyForCryptoBit = setStatisticMinusAllMoneyForCryptoBit;
    this.#setdevItemBookFieldValue = setdevItemBookFieldValue;
    this.#setdevItemSportFieldValue = setdevItemSportFieldValue;
    this.#setdevItemCarmaFieldValue = setdevItemCarmaFieldValue;
    this.#setdevItemProgerFieldValue = setdevItemProgerFieldValue;
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

    // this.#dosugSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectDosug);

    this.#dosugSelectElement.setDosugSelectHandler(this.#handleSelectDosug);
    addOverlay();

    if (Number(this.#dataUser().dosugCount) > 0) {
      this.#dosugSelectElement.element.querySelectorAll('.head-field__child-field').forEach((el) => {
        el.style.opacity = '0.5';
        el.style.pointerEvents = 'none';
      });
    }
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

  #handleSelectDosug = (evt) => {

    if (Number(this.#dataUser().dosugCount) === 0) {
      let currentProperty = this.#dataUser()[evt.dataset.property];
      this.#setCurrentPropertyUser(evt.dataset.property, Number(currentProperty + 1));
      this.#setCurrentPropertyUser('dosugCount', 1);
      this.#setStatisticMinusAllMoneyForCryptoBit(Number(evt.dataset.price))

      evt.parentNode.parentNode.querySelectorAll('.head-field__child-field').forEach((el) => {
        el.style.opacity = '0.5';
        el.style.pointerEvents = 'none';
      });
    }
    if (evt.dataset.property === 'books') this.#setdevItemBookFieldValue();
    if (evt.dataset.property ==='biceps') this.#setdevItemSportFieldValue();
    if (evt.dataset.property === 'carma') this.#setdevItemCarmaFieldValue();
    if (evt.dataset.property === 'proger') this.#setdevItemProgerFieldValue();
  }
}
