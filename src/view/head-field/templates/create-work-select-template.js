
const createItemWorkSelect = (work, salary, index= 1, proger, experience) => {
    return `<div style="background-image: url('/images/work/work-${index+1}.jpg');" data-work ="${index}" data-experience="${experience}" data-property="${work}" data-proger="${proger}" class="head-field__child-field work-select-field">${salary}</div>`;
}

export const createWorkSelectTemplate= (data) => {
  const workSelect = data.map((item, index) => {
    return createItemWorkSelect(item.work, item.salary, index, item.proger, item.experience);
  }).join('');

    return `<div class="head-field__work-select-container">
                <button class="head-field__close-work-select">&#10006;</button>
           ${workSelect}
            </div>`
}
