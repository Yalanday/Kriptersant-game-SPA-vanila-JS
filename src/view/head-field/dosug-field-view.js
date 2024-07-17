import AbstractView from '../../framework/view/abstract-view';
import {createDosugFieldTemplate} from "./templates/create-dosug-field-template";
export class DosugFieldView extends AbstractView {


  constructor() {
    super();
  }

  setDosugFieldHandler(callback) {
    this._callback.dosugFieldHandler = callback;
    this.element.addEventListener("click", this.#dosugFieldHandler);
  }

  #dosugFieldHandler = () => {
    this._callback.dosugFieldHandler();
  }

  get template() {
    return createDosugFieldTemplate();
  }
}
