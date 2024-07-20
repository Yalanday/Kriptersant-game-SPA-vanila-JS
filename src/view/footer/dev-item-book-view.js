import AbstractView from "../../framework/view/abstract-view";
import {createDevItemBookTemplate} from "./templates/create-dev-item-book-template";
export default class DevItemBookView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDevItemBookTemplate(this.#dataUser)
    }
}

