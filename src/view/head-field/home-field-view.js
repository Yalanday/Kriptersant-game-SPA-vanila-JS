import AbstractView from '../../framework/view/abstract-view';
import {createHomeFieldTemplate} from "./templates/create-home-field-template";

export class HomeFieldView extends AbstractView {

  #home = null;

  constructor(home = "У мамы") {
    super();
    this.#home = home;
  }

  setHomeFieldHandler(callback) {
    this._callback.homeFieldHandler = callback;
    this.element.addEventListener("click", this.#homeFieldHandler);
  }

  #homeFieldHandler = () => {
    this._callback.homeFieldHandler();
  }

  get template() {
    return createHomeFieldTemplate(this.#home);
  }
}
