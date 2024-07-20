import AbstractView from "../../framework/view/abstract-view";
import {createCreditLoveCreditTemplate} from "./templates/create-credit-love-credit-template";

export default class CreditItemLoveCreditView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser();
    }

    get template() {
        return createCreditLoveCreditTemplate(this.#dataUser)
    }
}

