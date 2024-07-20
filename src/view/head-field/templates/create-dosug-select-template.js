const dataDosug = [
    {name: 'Прочитать книгу', price: 5000, property: 'books', url: 'book.jpg'},
    {name: 'Качать железо', price: 2000, property: "biceps", url: 'sport.jpg'},
    {name: 'Изучать &lt;React/&gt;', price: 5000, property: 'proger', url: 'react.jpg'},
    {name: 'Помогать бездомным', price: 2000, property: 'carma', url: 'blago.jpg'},
];

const createDosugSelectItem = (data) => {
    return `<div style="position: relative; background-image: url('/images/dosug/${data.url}'); background-repeat: no-repeat; background-size: 100% 100%;" class="head-field__child-field work-select-field">
        <p style="margin-top: 0;">${data.name}</p>
        <p style="font-size: 1.1em; font-weight: 600">${data.price}</p>
        <div data-property="${data.property}" data-price="${data.price}" class="container-dataset" style = "position: absolute; top: 0; right: 0; left: 0; bottom: 0; background-color: rgba(255, 255, 255, 0);"></div>
    </div>`
}

export const createDosugSelectTemplate = () => {

    const selectItems = dataDosug.map((item) => {return createDosugSelectItem(item);}).join('')

    return `<div class="head-field__work-select-container">
                <button class="head-field__close-work-select">&#10006;</button>
                ${selectItems}
            </div>`
}
