import AbstractView from '../../framework/view/abstract-view';
import {createStartPopupTemplate} from "./templates/create-start-popup-template";

export class StartPopupView extends AbstractView {

  constructor() {
    super();
  }

  get template() {
    return createStartPopupTemplate();
  }
}
