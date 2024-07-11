import AbstractView from '../../framework/view/abstract-view';
import {createLoveFieldTemplate} from "./templates/create-love-field-template";
export class LoveFieldView extends AbstractView {
  #dataUser = null;

  constructor(dataUser) {
    super();
    this.#dataUser = dataUser;
  }

  setLoveFieldHandler(callback) {
    this._callback.loveFieldHandler = callback;
    this.element.addEventListener("click", this.#loveFieldHandler);
  }

  #loveFieldHandler = () => {
    this._callback.loveFieldHandler();
  }

  get template() {
    return createLoveFieldTemplate(this.#dataUser);
  }
}
