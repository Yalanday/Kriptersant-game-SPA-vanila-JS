export const createDebitItemDollarTemplate = ({dollar = 0}) => {
    return `<li class="footer__debit-item">Грязных зелёных бумажек: ${dollar} <span
            class="header__logo-usd">&#36;</span></li>`;
}
