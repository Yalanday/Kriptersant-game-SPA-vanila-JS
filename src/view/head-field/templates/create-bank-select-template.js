const dataBank = [
    {name: 'Вклад 3 дня', percent: 2, index: 0, url: 'vklad.jpg', type: 'deposit' , durationName: 'bankDeposit3DayCount', duration: 3, daysCreditType: 'bankDeposit3dSum'},
    {name: 'Вклад 10 дней', percent: 3, index: 0, url: 'vklad.jpg', type: 'deposit', durationName: 'bankDeposit10DayCount', duration: 10, daysCreditType: 'bankDeposit10dSum'},
    {name: 'Кредит 3 дня', percent: 8, index: 1, url: 'credit.jpg', type: 'credit', durationName: 'bankCredit3DayCount',  duration: 3, daysCreditType: 'bankCredit3dSum'},
    {name: 'Кредит 10 дней', percent: 6, index: 1, url: 'credit.jpg', type: 'credit', durationName:'bankCredit10DayCount', duration: 10, daysCreditType: 'bankCredit10dSum'},
    // {name: 'Рабатека', percent: 17, index: 2, url: 'ipoteka.jpg', type: 'ipoteka', duration: 10},
    // {name: 'Автокред', percent: 14, index: 2, url: 'avtocred.jpg', type: 'autoCredit' , duration: 10},
];

const createBankSelectItem = (data, dataUser) => {
    return `<div style="position: relative; background-image: url('/images/bank/${data.url}'); background-repeat: no-repeat; background-size: 100% 100%;" class="head-field__child-field work-select-field">
        <p style="margin-top: 0;">${data.name}</p>
        <p style="font-size: 1.1em; font-weight: 600">${data.percent}%</p>
        <div class="container-dataset" style = "position: absolute; top: 0; right: 0; left: 0; bottom: 0; background-color: rgba(255, 255, 255, 0);" data-percent="${Math.round(data.percent)}" data-type="${data.type}" data-durationName="${data.durationName}" data-duration="${data.duration}" data-daysCreditType="${data.daysCreditType}" data-daycount="${dataUser[data.durationName]}"></div>
    </div>`
}

export const createBankSelectTemplate= (dataUser) => {

    const selectItems = dataBank.map((item) => {return createBankSelectItem(item, dataUser);}).join('')

    return `<div class="head-field__work-select-container">
                <button class="head-field__close-work-select">&#10006;</button>
                ${selectItems}
            </div>`
}
