import AbstractView from "../../framework/view/abstract-view";
import {createDevItemProgerTemplate} from "./templates/create-dev-item-proger-template";

export default class DevItemProgerView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDevItemProgerTemplate(this.#dataUser)
    }
}

