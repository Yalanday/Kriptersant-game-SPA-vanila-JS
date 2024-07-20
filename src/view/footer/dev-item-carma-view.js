import AbstractView from "../../framework/view/abstract-view";
import {createDevItemCarmaTemplate} from "./templates/create-dev-item-carma-template";
export default class DevItemCarmaView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDevItemCarmaTemplate(this.#dataUser)
    }
}

