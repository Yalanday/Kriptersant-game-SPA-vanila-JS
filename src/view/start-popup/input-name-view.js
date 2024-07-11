import AbstractView from '../../framework/view/abstract-view';
import {createInputNamePopupTemplate} from "./templates/create-input-name-popup-template";

export class InputNameView extends AbstractView {

  #inputNamePopup = null;
  #inputNameButton = null;
  #thisNameUser = null;

  constructor() {
    super();
  }

  setInputNameClickHandler(callback) {
    this.#inputNamePopup = document.querySelector('.start-popup__input-name')
    this.#inputNameButton = document.querySelector('.start-popup__input-name-button')
    this._callback.buttonAvatarsClick = callback;
    this.#inputNamePopup.addEventListener('input', (evt) => {
      this.#thisNameUser = evt.target.value;
    })
    this.#inputNameButton.addEventListener('click', this.#buttonAvatarsClickHandler);
  }

  #buttonAvatarsClickHandler = () => {
    this._callback.buttonAvatarsClick(this, this.#thisNameUser);
  }

  get template() {
    return createInputNamePopupTemplate();
  }
}
