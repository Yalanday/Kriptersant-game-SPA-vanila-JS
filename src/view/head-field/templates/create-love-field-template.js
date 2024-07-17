export const createLoveFieldTemplate = ({gender = 'man'}) => {
    let genderLove = 'Моя няшка';
    if (gender === 'woman') genderLove = 'Мой хахаль';
    return `<div class="head-field__work-container">
                <div class="head-field__child-field work-field">&#x2764;&#xfe0f; ${genderLove} &#x2764;&#xfe0f;</div>
            </div>`
}
