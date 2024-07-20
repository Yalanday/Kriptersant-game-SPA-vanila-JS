import {render, replace, remove} from "../framework/render";
import {HeadFildView} from "../view/head-field/head-field-view";
import DebitItemCryptansStatusView from "../view/footer/debit-item-cryptans-status-view";
import DebitItemCryptansPlusStatusView from "../view/footer/debit-item-cryptans-plus-status-view";
import DebitItemSalaryStatusView from "../view/footer/debit-item-salary-status-view";
import DayAfloatView from "../view/header/dat-afloay-view";
import {addOverlay, DAY_SIZE, getRandomInRange, removeOverlay} from "../utils/utils";
import WorkFieldPresenter from "./work-field-presenter";
import CarFieldPresenter from "./car-field-presenter";
import BankFieldPresenter from "./bank-field-presenter";
import LoveFieldPresenter from "./love-field-presenter";
import CryptoFieldPresenter from "./crypto-field-presenter";
import HomeFieldPresenter from "./home-field-presenter";
import FooterLeftBlockView from "../view/footer/footer-left-block-view";
import FooterCenterBlockView from "../view/footer/footer-center-block-view";
import FooterRightBlockView from "../view/footer/footer-right-block-view";
import FooterCreditListView from "../view/footer/footer-credit-list-view";
import FooterDebitListView from "../view/footer/footer-debit-list-view";
import FooterDevelopmentListView from "../view/footer/footer-development-list-view";
import CreditItemCarCreditView from "../view/footer/credit-item-car-credit-view";
import CreditItemHomeCreditView from "../view/footer/credit-item-home-credit-view";
import CreditItemLoveCreditView from "../view/footer/credit-item-love-credit-view";
import CreditItem3dayCreditView from "../view/footer/credit-item-3day-credit-view";
import CreditItem10dayCreditView from "../view/footer/credit-item-10day-credit-view";
import DevItemBookView from "../view/footer/dev-item-book-view";
import DevItemSportView from "../view/footer/dev-item-sport-view";
import DevItemCarmaView from "../view/footer/dev-item-carma-view";
import DevItemProgerView from "../view/footer/dev-item-proger-view";
import DurCoinFieldPresenter from "./dur-coin-field-presenter";
import DebitItemDurCoinStatusView from "../view/footer/debit-item-dur-coin-status-view";
import DebitItemBikCoinStatusView from "../view/footer/debit-item-bik-coin-status-view";
import DebitItemDollarStatusView from "../view/footer/debit-item-dollar-status-view";
import DebitItemOilStatusView from "../view/footer/debit-item-oil-status-view";
import DebitItemGoldStatusView from "../view/footer/debit-item-gold-status-view";
import ChartPresenter from "./chart-presenter";
import DosugFieldPresenter from "./dosug-field-presenter";
import {saveButton, loadButton} from "../main";
import {SaveLoadPopupView} from "../view/head-field/save-load-popup-view";


export default class HeadFieldPresenter {
  //данные
  #dataUser = null;
  #dataWork = null;
  #configChart = null;
  #headFiledElement = null;

  // кнопки save load
  #saveButtonElement = saveButton;
  #loadButtonElement = loadButton;

  //дочерние презентеры
  #workFieldPresenter = null;
  #expensesCarHeadFieldPresenter = null;
  #bankFieldPresenter = null;
  #loveFieldPresenter = null;
  #cryptoFieldPresenter = null;
  #homeFieldPresenter = null;
  #durCoinFieldPresenter = null;
  #chartPresenter = null;
  #dosugFieldPresenter = null;

  //контейнеры

  #siteMainElement = null;
  #siteFooterElement = null;
  #dayAfloatContainer = null;

  //создаваемые элементы
  #statisticAllMoneyElement = null;
  #statisticMoneyPlusElement = null;
  #salaryStatusElement = null;
  #dayAfloatElement = null;
  #leftBlockFooterElement = null;
  #centralBlockFooterElement = null;
  #rightBlockFooterElement = null;
  #footerCreditListElement = null;
  #footerDebitListElement = null;
  #footerDevelopmentListElement = null;
  #creditItemCarCreditElement = null;
  #creditItemHomeCreditElement = null;
  #creditItemLoveCreditElement = null;
  #creditItem3dayCreditElement = null;
  #creditItem10dayCreditElement = null;
  #devItemBookElement = null;
  #devItemSportElement = null;
  #devItemCarmaElement = null;
  #devItemProgerElement = null;
  #debitItemDurCoinStatusElement = null;
  #debitItemBikCoinStatusElement = null;
  #debitItemDollarStatusElement = null;
  #debitItemOilStatusElement = null;
  #debitItemGoldStatusElement = null;
  #saveLoadPopupElement = null;

  constructor(dataUser, dataWork, configChart, siteMainElement, siteFooterElement, dayAfloatContainer) {
    this.#dataUser = dataUser;
    this.#dataWork = dataWork;
    this.#configChart = configChart;
    this.#siteMainElement = siteMainElement;
    this.#siteFooterElement = siteFooterElement;
    this.#dayAfloatContainer = dayAfloatContainer;
  }

  // передаваемый установщик зарплаты
  #setSalaryForRender = () => {
    let salaryStatusTempElement = new DebitItemSalaryStatusView(this.#actualDataUser);
    replace(salaryStatusTempElement, this.#salaryStatusElement);
    this.#salaryStatusElement = salaryStatusTempElement;
  }

  #count;

  //передача актуального стейта
  #actualDataUser = () => {
    return this.#dataUser;
  }

  #setNewDataConfigChart = () => {
    this.#configChart.data.datasets.forEach((element) => {
      element.data.shift();
      element.data.push(getRandomInRange(0, 3000));
    });
    this.#chartPresenter.update(this.#configChart);
  }

  //минусация при покупках
  #setDataMinusAllMoney = (sumMinus = 0) => {
    let currentCryptans = this.#dataUser.cryptans;
    this.#dataUser = {...this.#dataUser, cryptans: currentCryptans - Number(sumMinus)}
    this.#setStatisticAllMoney()
  }

  #setDataPlusAllMoney = (sumPlus = 0) => {
    let currentCryptans = this.#dataUser.cryptans;
    this.#dataUser = {...this.#dataUser, cryptans: currentCryptans + Number(sumPlus)}
    this.#setStatisticAllMoney()
  }

  //установка новых значений свойств dataUser
  #setCurrentPropertyUser = (property = '', value) => {
    let state = this.#dataUser;
    for (let key in state) {
      if (key === property) {
        state[key] = value;
      }
    }
    this.#dataUser = {...state};
  }

  // обратный отсчет банковских дней
  #setDayExperienceBank = (property, propertyMoney) => {
    if (this.#dataUser[property] > 0) {
      let newValue = this.#dataUser[property] - 1;
      this.#dataUser = {...this.#dataUser, [property]: newValue}
    }

    if (this.#dataUser[property] === 0) this.#dataUser = {...this.#dataUser, [propertyMoney]: 0}

    if (property === 'bankCredit3DayCount' && this.#dataUser[property] === 0) this.#setCreditItemCredit3DaysValue();
    if (property === 'bankCredit10DayCount' && this.#dataUser[property] === 0) this.#setCreditItemCredit10DaysValue();
  }

// счетчик дней и актуализация статистики баланса
  setDayExperience(daySize = DAY_SIZE) {
    setInterval(() => {
      this.#count = this.#dataUser.days;
      ++this.#count;
      this.#dataUser = {...this.#dataUser, days: this.#count};
      this.#dataUser = {...this.#dataUser, dayCountDurCoin: 0};
      this.#dataUser = {...this.#dataUser, dayCountBikCoin: 0};
      this.#dataUser = {...this.#dataUser, dayCountDollar: 0};
      this.#dataUser = {...this.#dataUser, dayCountOil: 0};
      this.#dataUser = {...this.#dataUser, dayCountGold: 0};
      this.#dataUser = {...this.#dataUser, dosugCount: 0};

      this.#setDayExperienceBank('bankCredit3DayCount', 'bankCredit3dSum');
      this.#setDayExperienceBank('bankCredit10DayCount', 'bankCredit10dSum');
      this.#setDayExperienceBank('bankDeposit3DayCount', 'bankDeposit3dSum');
      this.#setDayExperienceBank('bankDeposit10DayCount', 'bankDeposit10dSum');

      let dayAfloatTempElement = new DayAfloatView(this.#dataUser);
      replace(dayAfloatTempElement, this.#dayAfloatElement);
      this.#dayAfloatElement = dayAfloatTempElement;
      this.#setStatisticAllMoney();
      this.#setNewDataConfigChart()

    }, daySize);
  }

  setGenderOfAppStartPresenter(data) {
    this.#dataUser = {...data};
  }

  //актуализация статистики баланса
  #setStatisticAllMoney() {
    let currentCryptans = this.#dataUser.cryptans;
    let currentSalaty = this.#dataUser.salary;

    // console.log(currentSalaty)
    // console.log(this.#actualDataUser().salary)

    if (currentSalaty > 0) {
      console.log('>')
      let currentcryptanPlus = this.#dataUser.cryptansPlus;
      this.#dataUser = {...this.#dataUser, cryptansPlus: currentcryptanPlus - currentSalaty};
      this.#dataUser = {...this.#dataUser, cryptans: currentCryptans - currentSalaty};
      currentCryptans = this.#dataUser.cryptans;
    }

    let currentCarCredit = this.#dataUser.carCredit;
    let currentHomeCredit = this.#dataUser.homeCredit;
    let current3dayCredit = this.#dataUser.bankCredit3dSum;
    let current10dayCredit = this.#dataUser.bankCredit10dSum;
    let currentLoveCredit = this.#dataUser.loveCredit;
    let bankDeposit3dSum = this.#dataUser.bankDeposit3dSum;
    let bankDeposit10dSum = this.#dataUser.bankDeposit10dSum;

    let allCredit = currentCarCredit + currentHomeCredit + current3dayCredit + current10dayCredit + currentLoveCredit;
    let allDeposit = bankDeposit3dSum + bankDeposit10dSum;

    this.#dataUser = {...this.#dataUser, cryptans: currentCryptans + currentSalaty - allCredit + allDeposit};
    this.#dataUser = {...this.#dataUser, cryptansPlus: allDeposit + currentSalaty};
    console.log(this.#dataUser)

    let statisticAllMoneyTempElement = new DebitItemCryptansStatusView(this.#dataUser);
    replace(statisticAllMoneyTempElement, this.#statisticAllMoneyElement);
    this.#statisticAllMoneyElement = statisticAllMoneyTempElement;

    let statisticMoneyPlusTempElement = new DebitItemCryptansPlusStatusView(this.#dataUser);
    replace(statisticMoneyPlusTempElement, this.#statisticMoneyPlusElement);
    this.#statisticMoneyPlusElement = statisticMoneyPlusTempElement;
  }

  #setStatisticAllMoneyForDeposit = (coin) => {
    let currentCryptans = this.#dataUser.cryptansPlus;
    this.#dataUser = {...this.#dataUser, cryptansPlus: Number(currentCryptans) + Number(coin)};
    let statisticMoneyPlusTempElement = new DebitItemCryptansPlusStatusView(this.#dataUser);
    replace(statisticMoneyPlusTempElement, this.#statisticMoneyPlusElement);
    this.#statisticMoneyPlusElement = statisticMoneyPlusTempElement;
  }

  #setStatisticAllMoneyForCryptoBit = (coin) => {
    let currentCryptans = this.#dataUser.cryptans;
    this.#dataUser = {...this.#dataUser, cryptans: Number(currentCryptans) + Number(coin)};
    let statisticAllMoneyTempElement = new DebitItemCryptansStatusView(this.#dataUser);
    replace(statisticAllMoneyTempElement, this.#statisticAllMoneyElement);
    this.#statisticAllMoneyElement = statisticAllMoneyTempElement;
  }

  // минус "на счету"
  #setStatisticMinusAllMoneyForCryptoBit = (coin) => {
    let currentCryptans = this.#dataUser.cryptans;
    this.#dataUser = {...this.#dataUser, cryptans: Number(currentCryptans) - Number(coin)};
    let statisticAllMoneyTempElement = new DebitItemCryptansStatusView(this.#dataUser);
    replace(statisticAllMoneyTempElement, this.#statisticAllMoneyElement);
    this.#statisticAllMoneyElement = statisticAllMoneyTempElement;
  }

  // перерисовка расхода на тачку
  #setCreditItemCarCreditValue = () => {
    let CreditItemCarCreditTempElement = new CreditItemCarCreditView(this.#dataUser);
    replace(CreditItemCarCreditTempElement, this.#creditItemCarCreditElement);
    this.#creditItemCarCreditElement = CreditItemCarCreditTempElement;
  }

  #setCreditItemHomeCreditValue = () => {
    console.log('is credit home')
    let CreditItemHomeCreditTempElement = new CreditItemHomeCreditView(this.#dataUser);
    replace(CreditItemHomeCreditTempElement, this.#creditItemHomeCreditElement);
    this.#creditItemHomeCreditElement = CreditItemHomeCreditTempElement;
  }

  #setCreditItemCredit3DaysValue = () => {
    let creditItem3dayCreditTempElement = new CreditItem3dayCreditView(this.#actualDataUser);
    replace(creditItem3dayCreditTempElement, this.#creditItem3dayCreditElement);
    this.#creditItem3dayCreditElement = creditItem3dayCreditTempElement;
  }

  #setCreditItemCredit10DaysValue = () => {
    let creditItem10dayCreditTempElement = new CreditItem10dayCreditView(this.#actualDataUser);
    replace(creditItem10dayCreditTempElement, this.#creditItem10dayCreditElement);
    this.#creditItem10dayCreditElement = creditItem10dayCreditTempElement;
  }

  #setCreditItemLoveValue = () => {
    let creditItemLoveCreditTempElement = new CreditItemLoveCreditView(this.#actualDataUser);
    replace(creditItemLoveCreditTempElement, this.#creditItemLoveCreditElement);
    this.#creditItemLoveCreditElement = creditItemLoveCreditTempElement;
  }

  // Перерисовка всех видов крипты - 5 штук
  #setDebitItemDurCoinFieldValue = () => {
    let debitItemDurCoinStatusTempElement = new DebitItemDurCoinStatusView(this.#dataUser);
    replace(debitItemDurCoinStatusTempElement, this.#debitItemDurCoinStatusElement);
    this.#debitItemDurCoinStatusElement = debitItemDurCoinStatusTempElement;
  }

  #setDebitItemBikCoinFieldValue = () => {
    let debitItemBikCoinStatusTempElement = new DebitItemBikCoinStatusView(this.#dataUser);
    replace(debitItemBikCoinStatusTempElement, this.#debitItemBikCoinStatusElement);
    this.#debitItemBikCoinStatusElement = debitItemBikCoinStatusTempElement;
  }

  #setDebitItemDollarFieldValue = () => {
    let debitItemDollarStatusTempElement = new DebitItemDollarStatusView(this.#dataUser);
    replace(debitItemDollarStatusTempElement, this.#debitItemDollarStatusElement);
    this.#debitItemDollarStatusElement = debitItemDollarStatusTempElement;
  }

  #setDebitItemOilFieldValue = () => {
    let debitItemOilStatusTempElement = new DebitItemOilStatusView(this.#dataUser);
    replace(debitItemOilStatusTempElement, this.#debitItemOilStatusElement);
    this.#debitItemOilStatusElement = debitItemOilStatusTempElement;
  }

  #setDebitItemGoldFieldValue = () => {
    let debitItemGoldStatusTempElement = new DebitItemGoldStatusView(this.#dataUser);
    replace(debitItemGoldStatusTempElement, this.#debitItemGoldStatusElement);
    this.#debitItemGoldStatusElement = debitItemGoldStatusTempElement;
  }

  #setdevItemBookFieldValue = () => {
    let devItemBookTempElement = new DevItemBookView(this.#dataUser);
    replace(devItemBookTempElement, this.#devItemBookElement);
    this.#devItemBookElement = devItemBookTempElement;
  }

  #setdevItemSportFieldValue = () => {
    let devItemSportTempElement = new DevItemSportView(this.#dataUser);
    replace(devItemSportTempElement, this.#devItemSportElement);
    this.#devItemSportElement = devItemSportTempElement;
  }

  #setdevItemCarmaFieldValue = () => {
    let devItemCarmaTempElement = new DevItemCarmaView(this.#dataUser);
    replace(devItemCarmaTempElement, this.#devItemCarmaElement);
    this.#devItemCarmaElement = devItemCarmaTempElement;
  }

  #setdevItemProgerFieldValue = () => {
    let devItemProgerTempElement = new DevItemProgerView(this.#dataUser);
    replace(devItemProgerTempElement, this.#devItemProgerElement);
    this.#devItemProgerElement = devItemProgerTempElement;
  }

  init(startData = this.#dataUser) {
    //***************** HEADER *****************//

    this.#dataUser = startData;

    //статистика игровых дней
    this.#dayAfloatElement = new DayAfloatView(this.#dataUser);
    render(this.#dayAfloatElement, this.#dayAfloatContainer);
    //счетчик дней
    this.setDayExperience(DAY_SIZE);

    //***************** MAIN *****************//

    //главное поле для плашек с выбором разделов игры
    this.#headFiledElement = new HeadFildView;
    render(this.#headFiledElement, this.#siteMainElement);

    // "Работа" - Дочерний презентер
    this.#workFieldPresenter = new WorkFieldPresenter(this.#actualDataUser, this.#dataWork, this.#headFiledElement, this.#siteMainElement, this.#setCurrentPropertyUser, this.#setSalaryForRender, this.#setStatisticAllMoneyForDeposit);
    this.#workFieldPresenter.init();

    // Тапай ДурКоин - дочерний презентер
    this.#durCoinFieldPresenter = new DurCoinFieldPresenter(this.#actualDataUser, this.#headFiledElement, this.#setCurrentPropertyUser, this.#setDebitItemDurCoinFieldValue);
    this.#durCoinFieldPresenter.init();

    // КриптоБыржа - дочерний презентер
    this.#cryptoFieldPresenter = new CryptoFieldPresenter(this.#actualDataUser, this.#configChart, this.#headFiledElement, this.#setCurrentPropertyUser, this.#setDebitItemDurCoinFieldValue, this.#setDebitItemBikCoinFieldValue, this.#setDebitItemDollarFieldValue, this.#setDebitItemOilFieldValue, this.#setDebitItemGoldFieldValue, this.#setStatisticAllMoneyForCryptoBit, this.#setStatisticMinusAllMoneyForCryptoBit);
    this.#cryptoFieldPresenter.init();

    // Банк - дочерний презентер
    this.#bankFieldPresenter = new BankFieldPresenter(this.#actualDataUser, this.#headFiledElement, this.#setCurrentPropertyUser, this.#setDataMinusAllMoney, this.#setDataPlusAllMoney, this.#setCreditItemCredit3DaysValue, this.#setCreditItemCredit10DaysValue);
    this.#bankFieldPresenter.init();

    // Моя хата - дочерний презентер
    this.#homeFieldPresenter = new HomeFieldPresenter(this.#actualDataUser, this.#headFiledElement, this.#setDataMinusAllMoney, this.#setCurrentPropertyUser, this.#setCreditItemHomeCreditValue);
    this.#homeFieldPresenter.init();

    //Расходы - Моя тачка - дочерний презентер
    this.#expensesCarHeadFieldPresenter = new CarFieldPresenter(this.#actualDataUser, this.#headFiledElement, this.#setDataMinusAllMoney, this.#setCurrentPropertyUser, this.#setCreditItemCarCreditValue);
    this.#expensesCarHeadFieldPresenter.init();

    // Мой досуг - дочерний презентер
    this.#dosugFieldPresenter = new DosugFieldPresenter(this.#headFiledElement, this.#actualDataUser, this.#setCurrentPropertyUser, this.#setStatisticMinusAllMoneyForCryptoBit, this.#setdevItemBookFieldValue, this.#setdevItemSportFieldValue, this.#setdevItemCarmaFieldValue, this.#setdevItemProgerFieldValue);
    this.#dosugFieldPresenter.init();

    // Любовь - дочерний презентер
    this.#loveFieldPresenter = new LoveFieldPresenter(this.#actualDataUser, this.#headFiledElement, this.#setCurrentPropertyUser, this.#setStatisticMinusAllMoneyForCryptoBit, this.#setCreditItemLoveValue);
    this.#loveFieldPresenter.init();

    //***************** FOOTER *****************//
    // статистика доходов (левый блок), расходов (центральный блок), личностного роста (левый блок)
    this.#leftBlockFooterElement = new FooterLeftBlockView();
    render(this.#leftBlockFooterElement, this.#siteFooterElement);

    this.#centralBlockFooterElement = new FooterCenterBlockView();
    render(this.#centralBlockFooterElement, this.#siteFooterElement);

    this.#rightBlockFooterElement = new FooterRightBlockView();
    render(this.#rightBlockFooterElement, this.#siteFooterElement);

    // Приход - debit-list

    this.#footerDebitListElement = new FooterDebitListView(this.#dataUser);
    render(this.#footerDebitListElement, this.#leftBlockFooterElement.element);

    //Всего на счету:
    this.#statisticAllMoneyElement = new DebitItemCryptansStatusView(this.#dataUser);
    render(this.#statisticAllMoneyElement, this.#footerDebitListElement.element);

    // Зарплата/оклад
    this.#salaryStatusElement = new DebitItemSalaryStatusView(this.#actualDataUser);
    render(this.#salaryStatusElement, this.#footerDebitListElement.element);

    // Доход в день
    this.#statisticMoneyPlusElement = new DebitItemCryptansPlusStatusView(this.#dataUser);
    render(this.#statisticMoneyPlusElement, this.#footerDebitListElement.element);

    // Дуркоины на счету
    this.#debitItemDurCoinStatusElement = new DebitItemDurCoinStatusView(this.#dataUser);
    render(this.#debitItemDurCoinStatusElement, this.#footerDebitListElement.element);

    // БыкКоины на счету
    this.#debitItemBikCoinStatusElement = new DebitItemBikCoinStatusView(this.#dataUser);
    render(this.#debitItemBikCoinStatusElement, this.#footerDebitListElement.element);

    // Доллары на счету
    this.#debitItemDollarStatusElement = new DebitItemDollarStatusView(this.#dataUser);
    render(this.#debitItemDollarStatusElement, this.#footerDebitListElement.element);

    // Нефти на счету
    this.#debitItemOilStatusElement = new DebitItemOilStatusView(this.#dataUser);
    render(this.#debitItemOilStatusElement, this.#footerDebitListElement.element);

    // Золота на счету
    this.#debitItemGoldStatusElement = new DebitItemGoldStatusView(this.#dataUser);
    render(this.#debitItemGoldStatusElement, this.#footerDebitListElement.element);

    // Расход - credit-list
    this.#footerCreditListElement = new FooterCreditListView();
    render(this.#footerCreditListElement, this.#centralBlockFooterElement.element);

    // На тачку:
    this.#creditItemCarCreditElement = new CreditItemCarCreditView(this.#actualDataUser);
    render(this.#creditItemCarCreditElement, this.#footerCreditListElement.element);

    // На хату:
    this.#creditItemHomeCreditElement = new CreditItemHomeCreditView(this.#actualDataUser);
    render(this.#creditItemHomeCreditElement, this.#footerCreditListElement.element);

    // На любовь:
    this.#creditItemLoveCreditElement = new CreditItemLoveCreditView(this.#actualDataUser);
    render(this.#creditItemLoveCreditElement, this.#footerCreditListElement.element);

    // Платеж по 3 дн. кредиту
    this.#creditItem3dayCreditElement = new CreditItem3dayCreditView(this.#actualDataUser);
    render(this.#creditItem3dayCreditElement, this.#footerCreditListElement.element);

    // Платеж по 10 дн. кредиту
    this.#creditItem10dayCreditElement = new CreditItem10dayCreditView(this.#actualDataUser);
    render(this.#creditItem10dayCreditElement, this.#footerCreditListElement.element);

    // Саморазвитие - development-list
    this.#footerDevelopmentListElement = new FooterDevelopmentListView(this.#dataUser);
    render(this.#footerDevelopmentListElement, this.#rightBlockFooterElement.element);

    // Прочитано книг
    this.#devItemBookElement = new DevItemBookView(this.#dataUser);
    render(this.#devItemBookElement, this.#footerDevelopmentListElement.element);

    // Бицуха
    this.#devItemSportElement = new DevItemSportView(this.#dataUser);
    render(this.#devItemSportElement, this.#footerDevelopmentListElement.element);

    // Карма Святость
    this.#devItemCarmaElement = new DevItemCarmaView(this.#dataUser);
    render(this.#devItemCarmaElement, this.#footerDevelopmentListElement.element);

    // Прогерство
    this.#devItemProgerElement = new DevItemProgerView(this.#dataUser);
    render(this.#devItemProgerElement, this.#footerDevelopmentListElement.element);

    // График цен на крипту

    this.#chartPresenter = new ChartPresenter(this.#dataUser, this.#configChart, this.#siteFooterElement.parentElement.querySelector('.footer__container-canvas'),);
    this.#chartPresenter.init();

    this.#saveButtonElement.addEventListener('click', (this.#renderSavePopup));
    this.#loadButtonElement.addEventListener('click', (this.#renderLoadPopup));
  }


  // Сохранение данных
  #saveDataUserInLocalStorage = () => {
    localStorage.setItem('dataUser', JSON.stringify(this.#dataUser));
    this.#closeSaveLoadPopup();
  }

  #loadDataUserFromLocalStorage = () => {
    this.#closeSaveLoadPopup();
    remove(this.#dayAfloatElement)
    remove(this.#headFiledElement)
    remove(this.#leftBlockFooterElement)
    remove(this.#centralBlockFooterElement)
    remove(this.#rightBlockFooterElement)

    this.#chartPresenter.removeChart();
    this.#workFieldPresenter = null;
    this.#expensesCarHeadFieldPresenter = null;
    this.#bankFieldPresenter = null;
    this.#loveFieldPresenter = null;
    this.#cryptoFieldPresenter = null;
    this.#homeFieldPresenter = null;
    this.#durCoinFieldPresenter = null;
    this.#chartPresenter = null;
    this.#dosugFieldPresenter = null;

    this.init(JSON.parse(localStorage.getItem('dataUser')));
    this.#setCreditItemCarCreditValue();
    this.#setCreditItemHomeCreditValue();
    this.#setCreditItemCredit3DaysValue();
    this.#setCreditItemCredit10DaysValue();
    this.#setCreditItemLoveValue();

    console.log(this.#dataUser)
  }

  // попап подтверждения сохранения/загрузки
  #renderSavePopup = () => {
    this.#saveLoadPopupElement = new SaveLoadPopupView();
    render(this.#saveLoadPopupElement, this.#siteMainElement);
    // this.#saveLoadPopupElement.setEscKeydownHandler(this.#onEscKeyDownForSaveLoadPopup);
    this.#saveLoadPopupElement.setPopupYesButtonHandler(this.#saveDataUserInLocalStorage);
    this.#saveLoadPopupElement.setPopupNoButtonHandler(this.#closeSaveLoadPopup)
    addOverlay();
  }

  #renderLoadPopup = () => {
    this.#saveLoadPopupElement = new SaveLoadPopupView();
    render(this.#saveLoadPopupElement, this.#siteMainElement);
    // this.#saveLoadPopupElement.setEscKeydownHandler(this.#onEscKeyDownForSaveLoadPopup);
    this.#saveLoadPopupElement.setPopupYesButtonHandler(this.#loadDataUserFromLocalStorage);
    this.#saveLoadPopupElement.setPopupNoButtonHandler(this.#closeSaveLoadPopup)
    addOverlay();
  }

  #closeSaveLoadPopup = () => {
    remove(this.#saveLoadPopupElement);
    removeOverlay();
  }

  #onEscKeyDownForSaveLoadPopup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeSaveLoadPopup();
      document.removeEventListener('keydown', this.#onEscKeyDownForSaveLoadPopup);
    }
  };
}
