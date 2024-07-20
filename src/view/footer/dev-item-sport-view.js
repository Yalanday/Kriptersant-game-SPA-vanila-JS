import AbstractView from "../../framework/view/abstract-view";
import {createDevItemSportTemplate} from "./templates/create-dev-item-sport-template";
export default class DevItemSportView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDevItemSportTemplate(this.#dataUser)
    }
}

