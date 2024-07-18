import {render, replace, remove} from "../framework/render";
import {BankFieldView} from "../view/head-field/bank-field-view";
import {BankSelectedView} from "../view/head-field/bank-selected-view";
import {addOverlay, removeOverlay} from "../utils/utils";
import {BankInputView} from "../view/head-field/bank-input-view";

export default class BankFieldPresenter {
  #dataUser = null;
  #element = null;
  #inputElement = null;
  #container = null;
  #setCurrentPropertyUser = null;
  #setDataMinusAllMoney = null;
  #setDataPlusAllMoney = null;
  #setCreditItemCredit3DaysValue = null;
  #setCreditItemCredit10DaysValue = null;

  #bankSelectElement = null;


  constructor(dataUser, container, setCurrentPropertyUser, setDataMinusAllMoney, setDataPlusAllMoney, setCreditItemCredit3DaysValue, setCreditItemCredit10DaysValue) {
    this.#dataUser = dataUser;
    this.#container = container;
    this.#setCurrentPropertyUser = setCurrentPropertyUser;
    this.#setDataMinusAllMoney = setDataMinusAllMoney;
    this.#setDataPlusAllMoney = setDataPlusAllMoney;
    this.#setCreditItemCredit3DaysValue = setCreditItemCredit3DaysValue;
    this.#setCreditItemCredit10DaysValue = setCreditItemCredit10DaysValue;
  }

  init() {
    this.#element = new BankFieldView;
    render(this.#element, this.#container.element);
    this.#element.setBankFieldHandler(this.#handleBankField);
  }

  #handleBankField = () => {
    this.#bankSelectElement = new BankSelectedView(this.#dataUser());
    render(this.#bankSelectElement, this.#container.element);
    this.#bankSelectElement.setBankCloseBtnHandler(this.#handleCloseBtnBankSelect);
    this.#bankSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectBank);
    this.#bankSelectElement.setSelectBankHandler(this.#handleSelectBank);
    addOverlay();
  }

  #handleCloseBtnBankSelect = () => {
    remove(this.#bankSelectElement);
    this.#element.setBankFieldHandler(this.#handleBankField);
    removeOverlay();
  }

  #onEscKeyDownForSelectBank = (evt) => {
    if (evt.key === 'Escape' && this.#inputElement === null || evt.key === 'Esc' && this.#inputElement === null) {
      evt.preventDefault();
      remove(this.#bankSelectElement);
      this.#element.setBankFieldHandler(this.#handleBankField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectBank);
      removeOverlay();
    }
  };

  #handleInputBankEnterButton = (daysCreditType, input, durationName, duration, type, elementForBlock) => {

    if (type === 'deposit') {
      this.#setCurrentPropertyUser(daysCreditType, Math.round(Number(input.dataset.result) / Number(duration) + Number(input.dataset.sum)));
      this.#setCurrentPropertyUser(durationName, Number(duration));

      this.#setDataMinusAllMoney(Math.round(Number(input.dataset.result)))
      // this.#setDataPlusAllMoney(Math.round(Number(input.dataset.result) / Number(duration) + Number(input.dataset.sum)))
    }

    if (type === 'credit') {
      this.#setCurrentPropertyUser(daysCreditType, Math.round(Number(input.dataset.sum)));
      this.#setCurrentPropertyUser(durationName, Number(duration));

      // this.#setDataMinusAllMoney(Math.round(Number(input.dataset.sum)))
      this.#setDataPlusAllMoney(Math.round(Number(input.dataset.result)))
    }

    if (type === 'credit' && Number(duration) === 3) this.#setCreditItemCredit3DaysValue();
    if (type === 'credit' && Number(duration) === 10) this.#setCreditItemCredit10DaysValue();

    remove(this.#inputElement);
    this.#inputElement = null;
    elementForBlock.style.pointerEvents = 'none';
    elementForBlock.style.opacity= '0.5';
  }

  #handleInputBankCloseButton = (evt) => {
    console.log('input button close')
    remove(this.#inputElement);
    this.#inputElement = null;
  }

  #habdleInputBankChangeInput = (evt, valueCreditElement, enterButton, type, percent, durationName, duration) => {
    let valueSum;
    let valueResult = Math.round(Number(evt.target.value));
    evt.target.dataset.result = String(valueResult);

    if (type === 'deposit') {
      valueSum = Math.round(Number(evt.target.value) / 100 * Number(percent))
      valueCreditElement.textContent = valueSum;
      evt.target.dataset.sum = String(valueSum);

    } else {
      valueSum = Math.round(Number(evt.target.value) / Number(duration) + (Number(evt.target.value) / 100 * Number(percent) / Number(duration)));
      valueCreditElement.textContent = valueSum;
      evt.target.dataset.sum = String(valueSum);
    }

    if (evt.target.value === '' || Number(evt.target.value) > this.#dataUser().cryptans) {
      enterButton.style.pointerEvents = 'none';
      enterButton.style.opacity = '0.5';
    } else {
      enterButton.style.pointerEvents = 'auto';
      enterButton.style.opacity = '1';
    }
  }

  #handleSelectBank = (evt, percent, type, durationName, duration, daysCreditType) => {

    if (this.#inputElement !== null) {
      remove(this.#inputElement);
    }
    this.#inputElement = new BankInputView(this.#dataUser(), type, percent, durationName, duration, daysCreditType, evt.target.parentNode);
    render(this.#inputElement, this.#container.element)
    this.#inputElement.setBankInputHandlerEnter(this.#handleInputBankEnterButton)
    this.#inputElement.setBankInputHandlerClose(this.#handleInputBankCloseButton)
    this.#inputElement.setBankInputChange(this.#habdleInputBankChangeInput)
  }
}
