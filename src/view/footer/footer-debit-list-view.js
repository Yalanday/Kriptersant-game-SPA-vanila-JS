import AbstractView from "../../framework/view/abstract-view";
import {createFooterDebitListTemplate} from "./templates/create-footer-debit-list-template";
export default class FooterDebitListView extends AbstractView {


    constructor(dataUser) {
        super();
    }

    get template() {
        return createFooterDebitListTemplate();
    }
}

