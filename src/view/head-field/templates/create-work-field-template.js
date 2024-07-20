export const createWorkFieldTemplate = ({work}) => {

    if (work === '') work = 'Бездельник';

    return `<div class="head-field__work-container">
                <div class="head-field__child-field work-field">Работа: ${work}</div>
            </div>`
}
