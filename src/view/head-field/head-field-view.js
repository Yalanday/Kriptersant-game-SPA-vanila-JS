import AbstractView from '../../framework/view/abstract-view';
import { createHeadFieldTemplate } from './templates/create-head-field-template';

export class HeadFildView extends AbstractView {

    constructor(currentValue) {
        super();
    }

    get template() {
        return createHeadFieldTemplate();
    }
}
