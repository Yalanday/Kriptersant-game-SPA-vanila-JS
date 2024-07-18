import AbstractView from "../../framework/view/abstract-view";
import {createDebitItemCryptansPlusStatusTemplate} from "./templates/create-debit-item-cryptans-plus-status-template";

export default class DebitItemCryptansPlusStatusView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDebitItemCryptansPlusStatusTemplate(this.#dataUser)
    }
}

