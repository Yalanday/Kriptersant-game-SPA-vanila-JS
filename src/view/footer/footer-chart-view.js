import AbstractView from "../../framework/view/abstract-view";
import {createFooterChartTemplate} from "./templates/create-footer-chart-template";

export default class FooterChartView extends AbstractView {

    constructor() {
        super();
    }

    get template() {
        return createFooterChartTemplate();
    }
}

