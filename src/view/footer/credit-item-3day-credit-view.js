import AbstractView from "../../framework/view/abstract-view";
import {createCreditItem3dayCreditTemplate} from "./templates/create-credit-item-3day-credit-template";
export default class CreditItem3dayCreditView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createCreditItem3dayCreditTemplate(this.#dataUser())
    }
}

