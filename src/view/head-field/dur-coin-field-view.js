import AbstractView from '../../framework/view/abstract-view';
import {createDurCoinFieldTemplate} from "./templates/create-dur-coin-field-template";


export class DurCoinFieldView extends AbstractView {


  constructor() {
    super();
  }

  setDurCoinFieldHandler(callback) {
    this._callback.DurCoinFieldHandler = callback;
    this.element.addEventListener("click", this.#DurCoinFieldHandler);
  }

  #DurCoinFieldHandler = () => {
    this._callback.DurCoinFieldHandler();
  }

  get template() {
    return createDurCoinFieldTemplate();
  }
}
