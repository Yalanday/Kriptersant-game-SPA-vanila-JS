export const createCryptansStatusTemplate = ({cryptans}) => {
    return `<section class="footer__statistics">На счету криптерсанта: ${cryptans} к<span class="header__logo-rub">&#8381;</span><span
            class="header__logo-usd">&#36;</span></section>`;
}
