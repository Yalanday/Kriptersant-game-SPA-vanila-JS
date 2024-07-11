import AbstractView from "../../framework/view/abstract-view";
import {createSalaryStatusTemplate} from "./templates/create-salary-status-template";

export default class SalaryStatusView extends AbstractView {
    #workForRender = null

    constructor(workForRender) {
        super();
        this.#workForRender = workForRender;
    }

    get template() {
        return createSalaryStatusTemplate(this.#workForRender)
    }
}

