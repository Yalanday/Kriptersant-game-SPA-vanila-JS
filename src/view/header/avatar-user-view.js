import AbstractView from "../../framework/view/abstract-view";
import { createAvatarUserTemplate } from "./templates/create-avatar-user-template";

export default class AvatarUserView extends AbstractView {
    #dataUser = null;

    constructor(dataUser) {
        super();
        this.#dataUser = dataUser;
    }

    get template() {
        return createAvatarUserTemplate(this.#dataUser)
    }
}