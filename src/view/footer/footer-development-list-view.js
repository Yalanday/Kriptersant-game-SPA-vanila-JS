import AbstractView from "../../framework/view/abstract-view";
import {createFooterDevelopmentListTemplate} from "./templates/create-footer-development-list-template";

export default class FooterDevelopmentListView extends AbstractView {

    constructor() {
        super();
    }

    get template() {
        return createFooterDevelopmentListTemplate();
    }
}

