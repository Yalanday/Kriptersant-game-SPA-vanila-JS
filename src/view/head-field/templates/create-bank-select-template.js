const dataBank = [
    {name: 'Вклад 3 дня', price: 5, index: 0, url: 'vklad.jpg'},
    {name: 'Вклад 10 дней', price: 10, index: 0, url: 'vklad.jpg'},
    {name: 'Кредит 3 дня', price: 20, index: 1, url: 'credit.jpg'},
    {name: 'Кредит 10 дней', price: 10, index: 1, url: 'credit.jpg'},
    {name: 'Рабатека', price: 17, index: 2, url: 'ipoteka.jpg'},
    {name: 'Автокред', price: 14, index: 2, url: 'avtocred.jpg'},
];

const createBankSelectItem = (data) => {
    return `<div style="background-image: url('/images/bank/${data.url}'); background-repeat: no-repeat; background-size: 100% 100%;" class="head-field__child-field work-select-field">
        <p style="margin-top: 0;">${data.name}</p>
        <p style="font-size: 1.1em; font-weight: 600">${data.price}%</p>
    </div>`
}

export const createBankSelectTemplate= () => {

    const selectItems = dataBank.map((item) => {return createBankSelectItem(item);}).join('')

    return `<div class="head-field__work-select-container">
                <button class="head-field__close-work-select">&#10006;</button>
                ${selectItems}
            </div>`
}
