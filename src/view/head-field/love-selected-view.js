import AbstractView from '../../framework/view/abstract-view';
import {createLoveSelectTemplate} from "./templates/create-love-select-template";

export class LoveSelectedView extends AbstractView {

  constructor() {
    super();
  }

  setSelectLoveHandler(callback) {
    this._callback.setSelectLoveHandler = callback;
    this.element.querySelectorAll('.swiper-slide__description-container-button').forEach((el) => {
      el.addEventListener('click', this.#setSelectLoveHandler)
    });
  }

  #setSelectLoveHandler = (evt) => {
    this._callback.setSelectLoveHandler(evt);
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
    evt.preventDefault()
    this._callback.closeLoveBtnClickHandler(evt);
  }

  #escKeydownLoveSelectHandler = (evt) => {
    evt.preventDefault()
    this._callback.escKeydownLoveSelectHandler(evt);
  }


  get template() {
    return createLoveSelectTemplate();
  }
}
