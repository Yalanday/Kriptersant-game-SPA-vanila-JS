
const createItemCarSelect = (model, price, index) => {
    return `<div style="background-image: url('./images/car/car-${index+1}.jpg');" data-model="${model}" data-price="${price}" class="head-field__child-field work-select-field">${price}</div>`;
  // return `<div style="background-image: url('./images/car/car-${index+1}.jpg'); back" data-model="${model}" data-price="${price}" class="head-field__child-field work-select-field">${model}<br>${price}</div>`;

}

export const createCarSelectTemplate= (data) => {
const carsSelect = data.map((car, index) => {
    return createItemCarSelect(car.model, car.price, index);
}).join("");

    return `<div class="head-field__work-select-container">
                <button class="head-field__close-work-select">&#10006;</button>
                ${carsSelect}     
            </div>`
}

