import AbstractView from "../../framework/view/abstract-view";
import {createDebitItemSalaryTemplate} from "./templates/create-debit-item-salary-template";

export default class DebitItemSalaryStatusView extends AbstractView {
    #workForRender = null

    constructor(workForRender) {
        super();
        this.#workForRender = workForRender;
    }

    get template() {
        return createDebitItemSalaryTemplate(this.#workForRender)
    }
}

