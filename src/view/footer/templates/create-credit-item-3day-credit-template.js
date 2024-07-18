export const createCreditItem3dayCreditTemplate= ({bankCredit3dSum = 0}) => {
    return `<li class=" footer__credit-item">Кредит 3 дн.: ${bankCredit3dSum} к<span class="header__logo-rub">&#8381;</span><span
            class="header__logo-usd">&#36;</span></li>`;
}
