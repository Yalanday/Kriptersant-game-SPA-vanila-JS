export const createWorkSelectTemplate= (work = 'Лентяй', salary = 0) => {
    return `<div class="head-field__work-select-container">
                <button class="head-field__close-work-select">&#10006;</button>
                <div data-work ="1" data-experience="0" class="head-field__child-field work-select-field">Курьер<br>$20000</div>
                <div data-work ="2" data-experience="2" class="head-field__child-field work-select-field">Шаурмист<br>35000</div>
                <div data-work ="3" data-experience="4" class="head-field__child-field work-select-field">Мент<br>50000</div>
                <div data-work ="4" data-experience="6" class="head-field__child-field work-select-field">Офисник<br>75000</div>
                <div data-work ="5" data-experience="8" class="head-field__child-field work-select-field">Торгаш<br>100000</div>
                <div data-work ="6" data-experience="10" class="head-field__child-field work-select-field">Прогер<br>200000</div>
            </div>`
}
