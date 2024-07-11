import AbstractView from '../../framework/view/abstract-view';
import {createGenderPopupTemplate} from "./templates/create-gender-popup-template";

export class GenderView extends AbstractView {

  #buttonGenders = null;
  #typeGender = null;

  constructor() {
    super();
  }

  setButtonGenderClickHandler(callback) {
    this.#buttonGenders = document.querySelectorAll('.gender-button')
    this._callback.buttonGenderClick = callback;
    this.#buttonGenders.forEach((button) => {
      button.addEventListener('click', () => {
        if (button.getAttribute('id') === 'male') this.#typeGender ='man';
        if (button.getAttribute('id') === 'female') this.#typeGender ='woman';
        console.log(this.#typeGender)
        this.#buttonGenderClickHandler();
      })
    });
  }

  #buttonGenderClickHandler = () => {
    this._callback.buttonGenderClick(this, this.#typeGender);
  }

  get template() {
    return createGenderPopupTemplate();
  }
}
