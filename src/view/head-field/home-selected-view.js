import AbstractView from '../../framework/view/abstract-view';
import {createHomeSelectTemplate} from "./templates/create-home-select-template";

export class HomeSelectedView extends AbstractView {
  #dataUser = null;
  #dataHome = null;
  #minusAllMoney = null;

  constructor(dataUser, dataHome, minusAllMoney) {
    super();
    this.#dataUser = dataUser;
    this.#dataHome = dataHome;
    this.#minusAllMoney = minusAllMoney;
  }

  setHomeSelectHandler(callback) {
    this._callback.homeSelectClickHandler = callback;
    this.#setStyleElement();
    this.element.addEventListener('click', this.#homeSelectClickHandler);
  }

  setHomeCloseBtnHandler(callback) {
    this._callback.closeHomeBtnClickHandler = callback;
    this.element.querySelector('.head-field__close-work-select').addEventListener('click', this.#closeHomeBtnClickHandler);
  }

  setEscKeydownHandler(callback) {
    this._callback.escKeydownHomeSelectHandler = callback;
    document.addEventListener('keydown', this.#escKeydownHomeSelectHandler);
  }

  #closeHomeBtnClickHandler = (evt) => {
    this._callback.closeHomeBtnClickHandler();
  }


  #homeSelectClickHandler = (evt) => {
    if (evt.target.classList.contains('work-select-field')) {
      this._callback.homeSelectClickHandler(evt.target);
    }
  }

  #escKeydownHomeSelectHandler = (evt) => {
    this._callback.escKeydownHomeSelectHandler(evt);
  }

  #setStyleElement() {
    this.element.querySelectorAll('.work-select-field').forEach((el) => {
      if (this.#dataUser.cryptans < +el.dataset.price) {
        el.style.opacity = '0.5';
        el.style.pointerEvents = 'none';
      }

      if (this.#dataUser.home === el.dataset.model) {
        el.style.opacity = '0.5';
        el.style.pointerEvents = 'none';
        el.style.borderColor= 'green';
      }
    })
  }


  get template() {
    return createHomeSelectTemplate(this.#dataHome);
  }
}
