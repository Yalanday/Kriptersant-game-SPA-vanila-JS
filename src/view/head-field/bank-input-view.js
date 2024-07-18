import AbstractView from '../../framework/view/abstract-view';
import {createBankInputTemplate} from "./templates/create-bank-input-template";

export class BankInputView extends AbstractView {
  #dataUser = null;
  #type = null;
  #percent  = null;
  #durationName = null;
  #duration = null;
  #daysCreditType = null;
  #elementForBlock  = null;


  constructor(dataUser, type, percent, durationName, duration, daysCreditType, elementForBlock) {
    super();
    this.#dataUser = dataUser;
    this.#type = type;
    this.#percent = percent;
    this.#durationName = durationName;
    this.#duration = duration;
    this.#daysCreditType = daysCreditType;
    this.#elementForBlock = elementForBlock;
  }

  setBankInputHandlerEnter(callback) {
    this._callback.setBankInputHandlerEnter = callback;
    this.element.querySelector('.bank-input-field-button--enter').addEventListener("click", this.#setBankInputHandlerEnter);
  }

  #setBankInputHandlerEnter = () => {
    let input = this.element.querySelector('.bank-input-field-input');
    this._callback.setBankInputHandlerEnter(this.#daysCreditType, input, this.#durationName, this.#duration, this.#type, this.#elementForBlock);
  }

  setBankInputHandlerClose(callback) {
    this._callback.setBankInputHandlerClose = callback;
    this.element.querySelector('.bank-input-field-button--close').addEventListener("click", this.#setBankInputHandlerClose);
  }

  #setBankInputHandlerClose = () => {
    this._callback.setBankInputHandlerClose();
  }

  setBankInputChange(callback) {
    this._callback.setBankInputChange = callback;
    this.element.querySelector('.bank-input-field-input').addEventListener("input", this.#setBankInputChange);
  }

  #setBankInputChange= (evt) => {
    let valueCreditElement = this.element.querySelector('.bank-input-field-day-credit-value');
    let enterButton = this.element.querySelector('.bank-input-field-button--enter');
    this._callback.setBankInputChange(evt, valueCreditElement, enterButton, this.#type, this.#percent, this.#durationName, this.#duration);
  }

  get template() {
    return createBankInputTemplate(this.#dataUser, this.#type);
  }
}
