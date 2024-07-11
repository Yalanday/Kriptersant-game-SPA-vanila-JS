import AbstractView from '../../framework/view/abstract-view';
import {createWorkSelectTemplate} from "./templates/create-work-select-template";

export class WorkSelectFieldView extends AbstractView {

  #dataUser = null;

  constructor(dataUser) {
    super();
    this.#dataUser = dataUser;
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

  setEscKeydownHandler (callback) {
    this._callback.escKeydownWorkSelectHandler = callback;
    console.log('escKeydownWorkSelectHandler');
    document.addEventListener('keydown', this.#escKeydownWorkSelectHandler);
  }


  #closeBtnClickHandler = (evt) => {
    this._callback.closeBtnClickHandler();
  }

  #setStyleElement() {
    this.element.querySelectorAll('.work-select-field').forEach((el) => {
      if (this.#dataUser.days < el.dataset.experience) {
        el.style.opacity = '0.5';
        el.style.pointerEvents = 'none';
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
    return createWorkSelectTemplate();
  }
}
