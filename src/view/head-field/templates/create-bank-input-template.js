export const createBankInputTemplate = ({cryptans}, type, dayDeposit = 0) => {
    let valueProduct;
    type === 'deposit' ? valueProduct = 'Ежедневная прибыль' : valueProduct = 'Ежедневный платеж';

    return `<div class="bank-input-field">
                <p class="bank-input-field-all-money">Всего на счете: ${cryptans}</p>
                <p class="bank-input-field-day-credit"> ${valueProduct}: <span class="bank-input-field-day-credit-value">${dayDeposit}</span></p>
                <input type="number" data-sum="0" data-result="0" class="bank-input-field-input" placeholder="Введите сумму цифрами">
                <div class="bank-input-field-button-container">
                    <button class="bank-input-field-button bank-input-field-button--enter">Выбрать</button>    
                    <button class="bank-input-field-button bank-input-field-button--close">Закрыть</button>
                </div>                
            </div>`
}
