import AbstractView from "../../framework/view/abstract-view";
import {createDebitItemBikCoinTemplate} from "./templates/create-debit-item-bik-coin-template";

export default class DebitItemBikCoinStatusView extends AbstractView {
    #dataUser = null;


    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDebitItemBikCoinTemplate(this.#dataUser)
    }
}

