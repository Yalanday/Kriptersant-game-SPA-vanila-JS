import AbstractView from '../../framework/view/abstract-view';
import {createWorkFieldTemplate} from "./templates/create-work-field-template";

export class WorkFieldView extends AbstractView {

  #dataUser = null;

  constructor(dataUser) {
    super();
    this.#dataUser = dataUser;
  }

  setWorkFieldHandler(callback) {
    this._callback.workFieldClickHandler = callback;
    this.element.addEventListener("click", this.#workFieldClickHandler);
  }

  #workFieldClickHandler = () => {
    this._callback.workFieldClickHandler();
  }

  get template() {
    return createWorkFieldTemplate(this.#dataUser);
  }
}
