import AbstractView from '../../framework/view/abstract-view';
import {createSaveLoadPopupTemplate} from "./templates/create-save-load-popup-template";
export class SaveLoadPopupView extends AbstractView {



  constructor() {
    super();
  }

  setPopupYesButtonHandler(callback) {
    this._callback.yesButtonHandler = callback;
    this.element.querySelector('.yes-button').addEventListener("click", this.#yesButtonHandler);
  }

  #yesButtonHandler = () => {
    this._callback.yesButtonHandler();
  }

  setPopupNoButtonHandler(callback) {
    this._callback.noButtonHandler = callback;
    this.element.querySelector('.no-button').addEventListener("click", this.#noButtonHandler);
  }

  #noButtonHandler = () => {
    this._callback.noButtonHandler();
  }

  setEscKeydownHandler(callback) {
    this._callback.escKeydownWorkSelectHandler = callback;
    document.addEventListener('keydown', this.#escKeydownWorkSelectHandler);
  }
  #escKeydownWorkSelectHandler = (evt) => {
    this._callback.escKeydownWorkSelectHandler(evt);
  }

  get template() {
    return createSaveLoadPopupTemplate();
  }
}
