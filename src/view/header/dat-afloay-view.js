import AbstractView from "../../framework/view/abstract-view";
import { createDayAfloatTemplate } from "./templates/create-day-afloat-template copy";

export default class DayAfloatView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createDayAfloatTemplate(this.#dataUser)
    }
}