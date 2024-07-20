import AbstractView from "../../framework/view/abstract-view";
import {createDebitItemSalaryTemplate} from "./templates/create-debit-item-salary-template";

export default class DebitItemSalaryStatusView extends AbstractView {
    #dataUser = null

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDebitItemSalaryTemplate(this.#dataUser())
    }
}

