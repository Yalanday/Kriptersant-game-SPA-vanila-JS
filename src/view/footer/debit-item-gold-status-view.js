import AbstractView from "../../framework/view/abstract-view";
import {createDebitItemGoldTemplate} from "./templates/create-debit-item-gold-template";

export default class DebitItemGoldStatusView extends AbstractView {
    #dataUser = null;


    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDebitItemGoldTemplate(this.#dataUser)
    }
}

