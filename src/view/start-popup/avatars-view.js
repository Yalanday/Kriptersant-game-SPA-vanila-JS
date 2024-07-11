import AbstractView from '../../framework/view/abstract-view';
import {createAvatarsPopupTemplate} from "./templates/create-avatars-popup-template";
import {} from "../../mock/data-user";

export class AvatarsView extends AbstractView {

  #dataUser = null;
  #buttonAvatars = null;
  #dataNumber = null;

  constructor(dataUser) {
    super();
    this.#dataUser = dataUser;
  }

  setButtonAvatarClickHandler(callback) {
    this.#buttonAvatars = document.querySelectorAll('.avatar-button')
    this._callback.buttonAvatarsClick = callback;
    this.#buttonAvatars.forEach((button) => {
      button.addEventListener('click', () => {
        this.#dataNumber = Number(button.getAttribute('data-number'));
        this.#buttonAvatarsClickHandler();
      })
    });
  }

  #buttonAvatarsClickHandler = () => {
    this._callback.buttonAvatarsClick(this, this.#dataNumber);
  }

  get template() {
    return createAvatarsPopupTemplate(this.#dataUser);
  }
}
