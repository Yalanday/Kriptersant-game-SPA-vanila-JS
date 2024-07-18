const dataDosug = [
    {name: 'Прочитать книгу', price: 5000, index: 0, url: 'book.jpg'},
    {name: 'Попить пиво с криптанами', price: 10000, index: 0, url: 'beer.jpg'},
    {name: 'Качать железо', price: 2000, index: 1, url: 'sport.jpg'},
    {name: 'Изучать &lt;React/&gt;', price: 5000, index: 1, url: 'react.jpg'},
    {name: 'Помогать бездомным', price: 2000, index: 2, url: 'blago.jpg'},
    {name: 'Преисполняться', price: 0, index: 2, url: 'meditation.jpg'},
];

const createDosugSelectItem = (data) => {
    return `<div style="background-image: url('/images/dosug/${data.url}'); background-repeat: no-repeat; background-size: 100% 100%;" class="head-field__child-field work-select-field">
        <p style="margin-top: 0;">${data.name}</p>
        <p style="font-size: 1.1em; font-weight: 600">${data.price}</p>
    </div>`
}

export const createDosugSelectTemplate = () => {

    const selectItems = dataDosug.map((item) => {return createDosugSelectItem(item);}).join('')

    return `<div class="head-field__work-select-container">
                <button class="head-field__close-work-select">&#10006;</button>
                ${selectItems}
            </div>`
}
