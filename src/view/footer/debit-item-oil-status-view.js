import AbstractView from "../../framework/view/abstract-view";
import {createDebitItemOilTemplate} from "./templates/create-debit-item-oil-template";

export default class DebitItemOilStatusView extends AbstractView {
    #dataUser = null;


    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDebitItemOilTemplate(this.#dataUser)
    }
}

