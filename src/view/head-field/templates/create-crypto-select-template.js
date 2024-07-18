
const dataCryptoBit = [
    {name: 'Купить ДурКоин', sale: false, price: 0, index: 0, url: 'dur.jpg', type: 'durCoin'},
    {name: 'Продать ДурКоин', sale: true, price: 0, index: 0, url: 'dur.jpg', type: 'durCoin'},
    {name: 'Купить БыкКоин', sale: false, price: 0, index: 1, url: 'bik.jpg', type: 'bikCoin'},
    {name: 'Продать БыкКоин', sale: true, price: 0, index: 1, url: 'bik.jpg', type: 'bikCoin'},
    {name: 'Купить грязную зелёную бумажку', sale: false, price: 0, index: 2, url: 'dollar.jpg', type: 'dollar'},
    {name: 'Продать грязную зелёную бумажку', sale: true, price: 0, index: 2, url: 'dollar.jpg', type: 'dollar'},
    {name: 'Купить чёрную жижу', sale: false, price: 0, index: 3, url: 'oil.jpg', type: 'oil'},
    {name: 'Продать чёрную жижу', sale: true, price: 0, index: 3, url: 'oil.jpg', type: 'oil'},
    {name: 'Купить рыжуху', sale: false, price: 0, index: 4, url: 'gold.jpg', type: 'gold'},
    {name: 'Продать рыжуху', sale: true, price: 0, index: 4, url: 'gold.jpg', type: 'gold'},
];

const createCryptoSelectItem = (data) => {
    return `<div style="position: relative; background-image: url('/images/cryptobit/${data.url}'); background-repeat: no-repeat; background-size: 100% 100%;" class="head-field__child-field work-select-field">
        <p style="margin-top: 0;">${data.name}</p>
        <p style="font-size: 1.1em; font-weight: 600">${Math.round(data.price)}</p>
        <div style = "position: absolute; top: 0; right: 0; left: 0; bottom: 0; background-color: rgba(255, 255, 255, 0);" data-price="${Math.round(data.price)}" data-sale="${data.sale}" data-type="${data.type}"></div>
    </div>`
}

export const createCryptoSelectTemplate = (configChart) => {

    configChart.data.datasets.forEach((item, indexChart) => {
      dataCryptoBit.forEach((itemCrypro) => {
        if (itemCrypro.index === indexChart && itemCrypro.sale === false) {itemCrypro.price = (item.data[item.data.length - 1] / 100 * 110)}
        if (itemCrypro.index === indexChart && itemCrypro.sale === true) {itemCrypro.price = (item.data[item.data.length - 1] / 100 * 90)}
      })
    });

    const selectItems = dataCryptoBit.map((item) => {return createCryptoSelectItem(item);}).join('')

    return `<div class="head-field__work-select-container">
                <button class="head-field__close-work-select">&#10006;</button>
                ${selectItems}
            </div>`
}
