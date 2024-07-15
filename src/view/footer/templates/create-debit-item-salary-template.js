export const createDebitItemSalaryTemplate = (salary = 0) => {
    return `<li class="footer__debit-item">Оклад: ${salary} к<span class="header__logo-rub">&#8381;</span><span
            class="header__logo-usd">&#36;</span>/д.</li>`;
}
