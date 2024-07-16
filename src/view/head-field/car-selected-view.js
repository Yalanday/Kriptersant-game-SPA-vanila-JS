import AbstractView from '../../framework/view/abstract-view';
import {createCarSelectTemplate} from "./templates/create-car-select-template";

export class CarSelectedView extends AbstractView {

  #dataUser = null;
  #dataCar = null;

  constructor(dataUser, dataCar) {
    super();
    this.#dataUser = dataUser;
    this.#dataCar = dataCar;
  }

  setSelectCarHandler(callback) {
    this._callback.carSelectClickHandler = callback;
    this.#setStyleElement();
    this.element.addEventListener('click', this.#carSelectClickHandler);
  }

  setCarCloseBtnHandler(callback) {
    this._callback.closeCarBtnClickHandler = callback;
    this.element.querySelector('.head-field__close-work-select').addEventListener('click', this.#closeCarBtnClickHandler);
  }

  setEscKeydownHandler(callback) {
    this._callback.escKeydownCarSelectHandler = callback;
    document.addEventListener('keydown', this.#escKeydownCarSelectHandler);
  }


  #closeCarBtnClickHandler = (evt) => {
    this._callback.closeCarBtnClickHandler();
  }

  #setStyleElement() {
    this.element.querySelectorAll('.work-select-field').forEach((el) => {
      if (this.#dataUser.cryptans < el.dataset.price) {
        el.style.opacity = '0.5';
        el.style.pointerEvents = 'none';
      }

      if (this.#dataUser.car === el.dataset.model) {
        el.style.opacity = '0.5';
        el.style.pointerEvents = 'none';
        el.style.borderColor= 'green';
      }
    })
  }

  #carSelectClickHandler = (evt) => {
    if (evt.target.classList.contains('work-select-field')) {
      this._callback.carSelectClickHandler(evt.target);
    }
  }

  #escKeydownCarSelectHandler = (evt) => {
    this._callback.escKeydownCarSelectHandler(evt);
  }


  get template() {
    return createCarSelectTemplate(this.#dataCar);
  }
}
