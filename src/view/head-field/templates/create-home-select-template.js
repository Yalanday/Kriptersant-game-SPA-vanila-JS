const createItemHomeSelect = (model, price, expenses, index) => {
    return `<div style="background-image: url('/images/home/home-${index+1}.jpg');" data-model="${model}" data-price="${price}" data-expenses="${expenses}"class="head-field__child-field work-select-field">${price}</div>`;

}

export const createHomeSelectTemplate= (data) => {
    const homeSelect = data.map((home, index) => {
        return createItemHomeSelect(home.model, home.price, home.expenses, index);
    }).join("");

    return `<div class="head-field__work-select-container">
                <button class="head-field__close-work-select">&#10006;</button>
                ${homeSelect}     
            </div>`
}
