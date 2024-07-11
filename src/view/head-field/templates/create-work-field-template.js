export const createWorkFieldTemplate = (work = 'Лентяй') => {
    return `<div class="head-field__work-container">
                <div class="head-field__child-field work-field">Работа: ${work}</div>
            </div>`
}
