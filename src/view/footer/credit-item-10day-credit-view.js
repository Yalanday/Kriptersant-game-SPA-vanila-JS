import AbstractView from "../../framework/view/abstract-view";
import {createCreditItem10dayCreditTemplate} from "./templates/create-credit-item-10day-credit-template";
export default class CreditItem10dayCreditView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createCreditItem10dayCreditTemplate(this.#dataUser())
    }
}

