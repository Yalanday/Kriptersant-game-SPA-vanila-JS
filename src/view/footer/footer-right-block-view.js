import AbstractView from "../../framework/view/abstract-view";
import {createFooterRightBlockTemplate} from "./templates/create-footer-right-block-template";

export default class FooterRightBlockView extends AbstractView {

    constructor() {
        super();
    }

    get template() {
        return createFooterRightBlockTemplate();
    }
}

