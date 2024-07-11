import AbstractView from "../../framework/view/abstract-view";
import { createCryptansStatusTemplate } from "./templates/createCryptansStatusTemplate";

export default class CryptansStatusView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createCryptansStatusTemplate(this.#dataUser)
    }
}

