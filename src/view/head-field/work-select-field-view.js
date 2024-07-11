import AbstractView from '../../framework/view/abstract-view';
import {createWorkSelectTemplate} from "./templates/create-work-select-template";

export class WorkSelectFieldView extends AbstractView {

  #dataUser = null;
  #dataWork = null;


  constructor(dataUser, dataWork) {
    super();
    this.#dataUser = dataUser();
    this.#dataWork = dataWork;

  }

  setWorkSelectHandler(callback) {
    this._callback.workSelectClickHandler = callback;
    this.#setStyleElement();
    this.element.addEventListener('click', this.#workSelectClickHandler);
  }

  setCloseBtnHandler(callback) {
    this._callback.closeBtnClickHandler = callback;
    this.element.querySelector('.head-field__close-work-select').addEventListener('click', this.#closeBtnClickHandler);
  }

  setEscKeydownHandler(callback) {
    this._callback.escKeydownWorkSelectHandler = callback;
    document.addEventListener('keydown', this.#escKeydownWorkSelectHandler);
  }


  #closeBtnClickHandler = (evt) => {
    this._callback.closeBtnClickHandler();
  }

  #setStyleElement() {
    this.element.querySelectorAll('.work-select-field').forEach((el) => {
      if (this.#dataUser.days + 2 < el.dataset.experience) {
        el.style.opacity = '0.5';
        el.style.pointerEvents = 'none';
      }

      if (this.#dataUser.work === el.dataset.property) {
        el.style.opacity = '0.5';
        el.style.pointerEvents = 'none';
        el.style.borderColor= 'blue';
      }
    })
  }

  #workSelectClickHandler = (evt) => {
    if (evt.target.classList.contains('work-select-field')) {
      this._callback.workSelectClickHandler(evt.target.dataset.work);
    }
  }

  #escKeydownWorkSelectHandler = (evt) => {
    this._callback.escKeydownWorkSelectHandler(evt);
  }

  get template() {
    return createWorkSelectTemplate(this.#dataWork);
  }
}
