import {render, replace, remove} from "../framework/render";
import AvatarUserView from "../view/header/avatar-user-view";
import NameUserView from "../view/header/name-user-view";
import {StartPopupView} from "../view/start-popup/start-popup-view";
import {WelcomePopupView} from "../view/start-popup/welcome-view";
import {GenderView} from "../view/start-popup/gender-view";
import {AvatarsView} from "../view/start-popup/avatars-view";
import {InputNameView} from "../view/start-popup/input-name-view";
import HeadFieldPresenter from "./head-field-presenter";
import {DAY_SIZE} from "../utils/utils";

export default class AppStartPresenter {
  #dataUser = null;
  //контейнеры для элементов
  #bodyElement = null;
  #avatarNameContainer = null;
  #startPopupElement = new StartPopupView();
  #welcomePopupElement = new WelcomePopupView()
  #genderPopupElement = null;
  #avatarPopupElement = null;
  #inputNamePopupElement = null;
  #headPresenter = null;

  constructor(dataUser, bodyElement, avatarNameContainer, headPresenter) {
    this.#dataUser = dataUser;
    this.#bodyElement = bodyElement;
    this.#avatarNameContainer = avatarNameContainer;
    this.#headPresenter = headPresenter;
  }

  setGenderUser(gender) {
    switch (gender) {
      case 'man':
        this.#dataUser = {...this.#dataUser, 'gender': 'man'};
        break;
      case 'woman':
        this.#dataUser = {...this.#dataUser, 'gender': 'woman'};
        break;
      default:
        this.#dataUser = {...this.#dataUser, 'gender': null};
    }
  }

  avatarUserElement = null;
  avatarUserElementTemp = null;

  setAvatarUser() {

    if (this.avatarUserElementTemp !== null) {
      remove(this.avatarUserElementTemp)
    }

    if (this.nameUserElementTemp !== null) {
      remove(this.nameUserElementTemp)
    }

    if (this.avatarUserElement === null) {
      this.avatarUserElement = new AvatarUserView(this.#dataUser);
      render(this.avatarUserElement, this.#avatarNameContainer);
    }
    if (this.avatarUserElement !== null) {
      let newAvatarUserElement = new AvatarUserView(this.#dataUser);
      replace(newAvatarUserElement, this.avatarUserElement)
      this.avatarUserElement = newAvatarUserElement;
    }
  }

  nameUserElement = null;
  nameUserElementTemp = null;

  setNameUser() {

      if (this.nameUserElement === null) {
        this.nameUserElement = new NameUserView(this.#dataUser)
        render(this.nameUserElement, this.#avatarNameContainer);
      }
      if (this.nameUserElement !== null) {
        let newNameUserElement = new NameUserView(this.#dataUser);
        replace(newNameUserElement, this.nameUserElement)
        this.nameUserElement = newNameUserElement;
      }
  }

  init() {

    if (this.avatarUserElementTemp === null && this.nameUserElementTemp === null) {
      this.avatarUserElementTemp = new AvatarUserView(this.#dataUser)
      this.nameUserElementTemp = new NameUserView(this.#dataUser);
      render(this.avatarUserElementTemp, this.#avatarNameContainer);
    }

    render(this.#startPopupElement, this.#bodyElement);
    render(this.#welcomePopupElement, this.#startPopupElement.element)
    this.#welcomePopupElement.setButtonWelcomeClickHandler(this.#popupWelcomeButtonClickHandler)

    this.setAvatarUser();
    this.setGenderUser();
    this.setNameUser();
  }

  #popupWelcomeButtonClickHandler = (element) => {
    remove(element);
    this.#genderPopupElement = new GenderView;
    render(this.#genderPopupElement, this.#startPopupElement.element);
    this.#genderPopupElement.setButtonGenderClickHandler(this.#popupGenderButtonClickHandler);
  };

  #popupGenderButtonClickHandler = (element, typeGender) => {
    this.setGenderUser(typeGender)
    console.log(this.#dataUser)
    remove(element);
    this.#avatarPopupElement = new AvatarsView(this.#dataUser);
    render(this.#avatarPopupElement, this.#startPopupElement.element);
    this.#avatarPopupElement.setButtonAvatarClickHandler(this.#popupAvatarButtonClickHandler);
  }

  #popupAvatarButtonClickHandler = (element, imgSrc = 'no') => {
    this.#dataUser = {...this.#dataUser, 'avatar': Number(imgSrc)};
    this.setAvatarUser()
    remove(element);
    this.#inputNamePopupElement = new InputNameView;
    render(this.#inputNamePopupElement, this.#startPopupElement.element);
    this.#inputNamePopupElement.setInputNameClickHandler(this.#popupInputNameButtonClickHandler);
  }

  #popupInputNameButtonClickHandler = (element, name) => {
    if (name !== null) this.#dataUser = {...this.#dataUser, 'name': name};
    this.setNameUser();
    remove(element);
    remove(this.#startPopupElement);
    this.#headPresenter.init();
  }
}
