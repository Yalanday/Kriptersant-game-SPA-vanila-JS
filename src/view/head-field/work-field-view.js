import AbstractView from '../../framework/view/abstract-view';
import {createWorkFieldTemplate} from "./templates/create-work-field-template";

export class WorkFieldView extends AbstractView {

  #dataWork = null;
  #workForRender = null;

  constructor(dataWork, workForRender) {
    super();
    this.#dataWork = dataWork;
    this.#workForRender = workForRender;
  }

  setWorkFieldHandler(callback) {
    this._callback.workFieldClickHandler = callback;
    this.element.addEventListener("click", this.#workFieldClickHandler);
  }

  #workFieldClickHandler = () => {
    this._callback.workFieldClickHandler();
  }

  get template() {
    return createWorkFieldTemplate(this.#workForRender);
  }
}
