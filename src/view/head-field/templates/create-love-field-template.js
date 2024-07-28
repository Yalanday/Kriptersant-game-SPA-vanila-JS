export const createLoveFieldTemplate = ({gender = 'man', love}) => {
    let genderLove = 'Моя няшка';
    if (gender === 'woman') genderLove = 'Мой хахаль';
    return `<div class="head-field__work-container head-field__work-container--love">
                <div class="head-field__child-field work-field">&#x2764;&#xfe0f; ${genderLove} &#x2764;&#xfe0f; ${love}</div>
            </div>`
}
