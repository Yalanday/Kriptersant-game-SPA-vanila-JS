import AbstractView from '../../framework/view/abstract-view';
import {createLoveSelectTemplate} from "./templates/create-love-select-template";

export class LoveSelectedView extends AbstractView {

  constructor() {
    super();
  }

  setLoveSelectHandler(callback) {
    this._callback.loveSelectClickHandler = callback;
    this.element.addEventListener('click', this.#loveSelectClickHandler);
  }

  setLoveCloseBtnHandler(callback) {
    this._callback.closeLoveBtnClickHandler = callback;
    this.element.querySelector('.head-field__close-work-select').addEventListener('click', this.#closeLoveBtnClickHandler);
  }

  setEscKeydownHandler(callback) {
    this._callback.escKeydownLoveSelectHandler = callback;
    document.addEventListener('keydown', this.#escKeydownLoveSelectHandler);
  }


  #closeLoveBtnClickHandler = (evt) => {
    this._callback.closeLoveBtnClickHandler();
  }


  #loveSelectClickHandler = (evt) => {
    if (evt.target.classList.contains('work-select-field')) {
      this._callback.loveSelectClickHandler(evt.target);
    }
  }

  #escKeydownLoveSelectHandler = (evt) => {
    this._callback.escKeydownLoveSelectHandler(evt);
  }


  get template() {
    return createLoveSelectTemplate();
  }
}
