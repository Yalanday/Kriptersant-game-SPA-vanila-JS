import AbstractView from "../../framework/view/abstract-view";
import {createFooterLeftBlockTemplate} from "./templates/create-footer-left-block-template";

export default class FooterLeftBlockView extends AbstractView {

    constructor() {
        super();
    }

    get template() {
        return createFooterLeftBlockTemplate()
    }
}

