import AbstractView from '../../framework/view/abstract-view';
import {createBankSelectTemplate} from "./templates/create-bank-select-template";

export class BankSelectedView extends AbstractView {

  #dataUser = null;

  constructor(dataUser) {
    super();
    this.#dataUser = dataUser;
  }

  setSelectBankHandler(callback) {
    this._callback.bankSelectClickHandler = callback;
    this.element.querySelectorAll('.work-select-field').forEach((el) => {
      el.addEventListener('click', this.#bankSelectClickHandler);
      if (Number(el.querySelector('.container-dataset').dataset.daycount) > 0) {
        el.style.opacity = 0.5;
        el.style.pointerEvents = 'none';
      } else {
        el.style.opacity = 1;
        el.style.pointerEvents = 'auto';
      }
    });
  }

  #bankSelectClickHandler = (evt) => {
    let percent = evt.target.dataset.percent;
    let type = evt.target.dataset.type;
    let durationName = evt.target.dataset.durationname;
    let duration = evt.target.dataset.duration;
    let daysCreditType = evt.target.dataset.dayscredittype;
    this._callback.bankSelectClickHandler(evt, percent, type, durationName, duration, daysCreditType);
  }

  setBankCloseBtnHandler(callback) {
    this._callback.closeCarBtnClickHandler = callback;
    this.element.querySelector('.head-field__close-work-select').addEventListener('click', this.#closeCarBtnClickHandler);
  }

  setEscKeydownHandler(callback) {
    this._callback.escKeydownBankSelectHandler = callback;
    document.addEventListener('keydown', this.#escKeydownBankSelectHandler);
  }

  #closeCarBtnClickHandler = (evt) => {
    this._callback.closeCarBtnClickHandler();
  }

  #escKeydownBankSelectHandler = (evt) => {
    this._callback.escKeydownBankSelectHandler(evt);
  }

  get template() {
    return createBankSelectTemplate(this.#dataUser);
  }
}
