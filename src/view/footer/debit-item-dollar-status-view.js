import AbstractView from "../../framework/view/abstract-view";
import {createDebitItemDollarTemplate} from "./templates/create-debit-item-dollar-template";

export default class DebitItemDollarStatusView extends AbstractView {
    #dataUser = null;


    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDebitItemDollarTemplate(this.#dataUser)
    }
}

