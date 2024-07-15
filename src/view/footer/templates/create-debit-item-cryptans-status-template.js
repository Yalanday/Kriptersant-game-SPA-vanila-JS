export const createDebitItemCryptansStatusTemplate = ({cryptans}) => {
    return `<li class=" footer__debit-item">На счету криптерсанта: ${cryptans} к<span class="header__logo-rub">&#8381;</span><span
            class="header__logo-usd">&#36;</span></li>`;
}
