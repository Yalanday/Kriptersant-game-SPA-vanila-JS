export const createHomeFieldTemplate = ({home}) => {

    if (home === '') home = 'У мамы';

    return `<div class="head-field__work-container">
                <div class="head-field__child-field work-field">🏠 Моя хата: ${home}</div>
            </div>`
}
