export const createCreditItem10dayCreditTemplate= ({bankCredit10dSum = 0}) => {
    return `<li class=" footer__credit-item">Кредит 10 дн.: ${bankCredit10dSum} к<span class="header__logo-rub">&#8381;</span><span
            class="header__logo-usd">&#36;</span></li>`;
}