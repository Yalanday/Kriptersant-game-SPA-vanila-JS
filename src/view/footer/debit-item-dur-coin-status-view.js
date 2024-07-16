import AbstractView from "../../framework/view/abstract-view";
import {createDebitItemDurCoinTemplate} from "./templates/create-debit-item-dur-coin-template";

export default class DebitItemDurCoinStatusView extends AbstractView {
    #dataUser = null;


    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDebitItemDurCoinTemplate(this.#dataUser)
    }
}

