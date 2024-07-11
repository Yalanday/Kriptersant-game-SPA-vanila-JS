import AbstractView from '../../framework/view/abstract-view';
import {createWelcomePopupTemplate} from "./templates/create-welcome-popup-template";
import {remove} from "../../framework/render";

export class WelcomePopupView extends AbstractView {

  #buttonWelcome = null;

  constructor() {
    super();
  }

  setButtonWelcomeClickHandler (callback) {
    this.#buttonWelcome = document.querySelector('.start-popup__welcome-button')
    this._callback.buttonClick = callback;
    this.#buttonWelcome.addEventListener('click', this.#buttonWelcomeClickHandler);
  }

  #buttonWelcomeClickHandler  =  (evt)  =>  {
    evt.preventDefault();
    this._callback.buttonClick(this);
  }

  get template() {
    return createWelcomePopupTemplate();
  }
}
