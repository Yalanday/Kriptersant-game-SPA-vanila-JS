
const dataCryptoBit = [
    {name: 'Купить ДурКоин', price: 0, index: 0, url: 'dur.jpg'},
    {name: 'Продать ДурКоин', price: 0, index: 0, url: 'dur.jpg'},
    {name: 'Купить БыкКоин', price: 0, index: 1, url: 'bik.jpg'},
    {name: 'Продать БыкКоин', price: 0, index: 1, url: 'bik.jpg'},
    {name: 'Купить грязную зелёную бумажку', price: 0, index: 2, url: 'dollar.jpg'},
    {name: 'Продать грязную зелёную бумажку', price: 0, index: 2, url: 'dollar.jpg'},
    {name: 'Купить чёрную жижу', price: 0, index: 3, url: 'oil.jpg'},
    {name: 'Продать чёрную жижу', price: 0, index: 3, url: 'oil.jpg'},
    {name: 'Купить рыжуху', price: 0, index: 4, url: 'gold.jpg'},
    {name: 'Продать рыжуху', price: 0, index: 4, url: 'gold.jpg'},
];

const createCryptoSelectItem = (data) => {
    return `<div style="background-image: url('/images/cryptobit/${data.url}'); background-repeat: no-repeat; background-size: 100% 100%;" class="head-field__child-field work-select-field">
        <p style="margin-top: 0;">${data.name}</p>
        <p style="font-size: 1.1em; font-weight: 600">${data.price}</p>
    </div>`
}

export const createCryptoSelectTemplate = () => {

    const selectItems = dataCryptoBit.map((item) => {return createCryptoSelectItem(item);}).join('')

    return `<div class="head-field__work-select-container">
                <button class="head-field__close-work-select">&#10006;</button>
                ${selectItems}
            </div>`
}
