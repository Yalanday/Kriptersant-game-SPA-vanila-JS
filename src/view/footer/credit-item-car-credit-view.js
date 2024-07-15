import AbstractView from "../../framework/view/abstract-view";
import {createCreditItemCarCreditTemplate} from "./templates/create-credit-item-car-credit-template";
export default class CreditItemCarCreditView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createCreditItemCarCreditTemplate(this.#dataUser)
    }
}

