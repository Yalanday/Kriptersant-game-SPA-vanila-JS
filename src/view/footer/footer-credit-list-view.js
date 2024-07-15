import AbstractView from "../../framework/view/abstract-view";
import {createFooterCreditListTemplate} from "./templates/create-footer-credit-list-template";

export default class FooterCreditListView extends AbstractView {

    constructor() {
        super();
    }

    get template() {
        return createFooterCreditListTemplate();
    }
}

