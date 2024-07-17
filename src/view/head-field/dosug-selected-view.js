import AbstractView from '../../framework/view/abstract-view';
import {createDosugSelectTemplate} from "./templates/create-dosug-select-template";
export class DosugSelectedView extends AbstractView {

  constructor() {
    super();
  }

  setDosugSelectHandler(callback) {
    this._callback.dosugSelectClickHandler = callback;
    this.element.addEventListener('click', this.#dosugSelectClickHandler);
  }

  setDosugCloseBtnHandler(callback) {
    this._callback.closeDosugBtnClickHandler = callback;
    this.element.querySelector('.head-field__close-work-select').addEventListener('click', this.#closeDosugBtnClickHandler);
  }

  setEscKeydownHandler(callback) {
    this._callback.escKeydownDosugSelectHandler = callback;
    document.addEventListener('keydown', this.#escKeydownDosugSelectHandler);
  }


  #closeDosugBtnClickHandler = (evt) => {
    this._callback.closeDosugBtnClickHandler();
  }


  #dosugSelectClickHandler = (evt) => {
    if (evt.target.classList.contains('work-select-field')) {
      this._callback.dosugSelectClickHandler(evt.target);
    }
  }

  #escKeydownDosugSelectHandler = (evt) => {
    this._callback.escKeydownDosugSelectHandler(evt);
  }


  get template() {
    return createDosugSelectTemplate();
  }
}