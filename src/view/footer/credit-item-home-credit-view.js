import AbstractView from "../../framework/view/abstract-view";
import {createCreditItemHomeCreditTemplate} from "./templates/create-credit-item-home-credit-template";

export default class CreditItemHomeCreditView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createCreditItemHomeCreditTemplate(this.#dataUser)
    }
}

