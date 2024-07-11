import AbstractView from "../../framework/view/abstract-view";
import { createNameUserTemplate } from "./templates/create-name-user-template";

export default class NameUserView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createNameUserTemplate(this.#dataUser)
    }
}