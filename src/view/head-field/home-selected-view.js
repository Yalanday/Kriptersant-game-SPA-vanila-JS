import AbstractView from '../../framework/view/abstract-view';
import {createHomeSelectTemplate} from "./templates/create-home-select-template";

export class HomeSelectedView extends AbstractView {

  constructor() {
    super();
  }

  setHomeSelectHandler(callback) {
    this._callback.homeSelectClickHandler = callback;
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


  get template() {
    return createHomeSelectTemplate();
  }
}
