import AbstractView from "../../framework/view/abstract-view";
import { createDebitItemCryptansStatusTemplate } from "./templates/create-debit-item-cryptans-status-template";

export default class DebitItemCryptansStatusView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDebitItemCryptansStatusTemplate(this.#dataUser)
    }
}

