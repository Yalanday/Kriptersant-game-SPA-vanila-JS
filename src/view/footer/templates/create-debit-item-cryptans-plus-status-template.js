export const createDebitItemCryptansPlusStatusTemplate= ({cryptansPlus}) => {
    return `<li class=" footer__debit-item">Доход в день: ${cryptansPlus} к<span class="header__logo-rub">&#8381;</span><span
            class="header__logo-usd">&#36;</span></li>`;
}
