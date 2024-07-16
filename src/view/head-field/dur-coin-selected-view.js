import AbstractView from '../../framework/view/abstract-view';
import {createDurCoinSelectTemplate} from "./templates/create-dur-coin-select-template";

export class DurCoinSelectedView extends AbstractView {

  #countPhrase = 0;

  constructor() {
    super();
  }

  #generatorPhraseTextContent = () => {
    if (this.#countPhrase === 1) {
      this.element.querySelector('.dur-coin-tap-hidden-phrase').textContent = 'Ещё!!!';
    } else if (this.#countPhrase === 10 ) {
      this.element.querySelector('.dur-coin-tap-hidden-phrase').textContent = 'Бинго!!!';
    } else if (this.#countPhrase%2 === 0 ) {
      this.element.querySelector('.dur-coin-tap-hidden-phrase').textContent = 'Отлично';
    } else if (this.#countPhrase%3 === 0 ) {
      this.element.querySelector('.dur-coin-tap-hidden-phrase').textContent = 'Молодец';
    } else {
      this.element.querySelector('.dur-coin-tap-hidden-phrase').textContent = 'Продолжай';
    }
  }


  setDurCoinSelectHandler(callback) {
    this._callback.durCoinSelectClickHandler = callback;
    this.element.querySelector('.dur-coin-tap-button').addEventListener('click', this.#durCoinSelectClickHandler);
  }

  #visibleCoinClickHandler = (evt) => {

    if (this.#countPhrase === 10) {
      this.element.querySelector('.dur-coin-tap-button').style.pointerEvents = 'none';
      this.element.querySelector('.dur-coin-tap-button').style.opacity= '0.3';
    }

    this.element.querySelector('.dur-coin-tap-hidden-coin').classList.add('active');
    this.element.querySelector('.dur-coin-tap-hidden-phrase').classList.add('active');

    setTimeout(() => {
      this.element.querySelector('.dur-coin-tap-hidden-coin').classList.remove('active');
      this.element.querySelector('.dur-coin-tap-hidden-phrase').classList.remove('active');
    }, 500)
  }

  #durCoinSelectClickHandler = (evt) => {
    evt.preventDefault();
    this.#countPhrase++;

    this.#generatorPhraseTextContent()
    this.#visibleCoinClickHandler();
    this._callback.durCoinSelectClickHandler(evt, this.#countPhrase);
  }

  setDurCoinCloseBtnHandler(callback) {
    this._callback.closeCarBtnClickHandler = callback;
    this.element.querySelector('.head-field__close-work-select').addEventListener('click', this.#closeDurCoinBtnClickHandler);
  }

  setEscKeydownHandler(callback) {
    this._callback.escKeydownDurCoinSelectHandler = callback;
    document.addEventListener('keydown', this.#escKeydownDurCoinSelectHandler);
  }


  #closeDurCoinBtnClickHandler = (evt) => {
    this._callback.closeCarBtnClickHandler();
  }

  #escKeydownDurCoinSelectHandler = (evt) => {
    this._callback.escKeydownDurCoinSelectHandler(evt);
  }


  get template() {
    return createDurCoinSelectTemplate();
  }
}
