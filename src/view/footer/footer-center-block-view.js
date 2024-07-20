import AbstractView from "../../framework/view/abstract-view";
import {createFooterCenterBlockTemplate} from "./templates/create-footer-center-block-template";

export default class FooterCenterBlockView extends AbstractView {

    constructor() {
        super();
    }

    get template() {
        return createFooterCenterBlockTemplate();
    }
}

