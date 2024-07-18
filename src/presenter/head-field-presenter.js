import {render, replace, remove} from "../framework/render";
import {HeadFildView} from "../view/head-field/head-field-view";
import DebitItemCryptansStatusView from "../view/footer/debit-item-cryptans-status-view";
import DebitItemSalaryStatusView from "../view/footer/debit-item-salary-status-view";
import DayAfloatView from "../view/header/dat-afloay-view";
import {DAY_SIZE, getRandomInRange} from "../utils/utils";
import WorkFieldPresenter from "./work-field-presenter";
import CarFieldPresenter from "./car-field-presenter";
import BankFieldPresenter from "./bank-field-presenter";
import LoveFieldPresenter from "./love-field-presenter";
import CryptoFieldPresenter from "./crypto-field-presenter";
import HomeFieldPresenter from "./home-field-presenter";
import FooterLeftBlockView from "../view/footer/footer-left-block-view";
import FooterRightBlockView from "../view/footer/footer-right-block-view";
import FooterCreditListView from "../view/footer/footer-credit-list-view";
import FooterDebitListView from "../view/footer/footer-debit-list-view";
import CreditItemCarCreditView from "../view/footer/credit-item-car-credit-view";
import CreditItemHomeCreditView from "../view/footer/credit-item-home-credit-view";
import DurCoinFieldPresenter from "./dur-coin-field-presenter";
import DebitItemDurCoinStatusView from "../view/footer/debit-item-dur-coin-status-view";
import DebitItemBikCoinStatusView from "../view/footer/debit-item-bik-coin-status-view";
import DebitItemDollarStatusView from "../view/footer/debit-item-dollar-status-view";
import DebitItemOilStatusView from "../view/footer/debit-item-oil-status-view";
import DebitItemGoldStatusView from "../view/footer/debit-item-gold-status-view";
import ChartPresenter from "./chart-presenter";
import DosugFieldPresenter from "./dosug-field-presenter";


export default class HeadFieldPresenter {
  //данные
  #dataUser = null;
  #dataWork = null;
  #configChart = null;

  //overlay for modal

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
  #headFiledElement = null;
  #siteMainElement = null;
  #siteFooterElement = null;
  #dayAfloatContainer = null;

  //создаваемые элементы
  #statisticAllMoneyElement = null;
  #salaryStatusElement = null;
  #dayAfloatElement = null;
  #leftBlockFooterElement = null;
  #rightBlockFooterElement = null;
  #footerCreditListElement = null;
  #footerDebitListElement = null;
  #creditItemCarCreditElement = null;
  #creditItemHomeCreditElement = null;
  #debitItemDurCoinStatusElement = null;
  #debitItemBikCoinStatusElement = null;
  #debitItemDollarStatusElement = null;
  #debitItemOilStatusElement = null;
  #debitItemGoldStatusElement = null;

  constructor(dataUser, dataWork, configChart, siteMainElement, siteFooterElement, dayAfloatContainer) {
    this.#dataUser = dataUser;
    this.#dataWork = dataWork;
    this.#configChart = configChart;
    this.#siteMainElement = siteMainElement;
    this.#siteFooterElement = siteFooterElement;
    this.#dayAfloatContainer = dayAfloatContainer;
  }

  // передаваемый установщик зарплаты
  #setSalaryForRender = (index = 0) => {
      let salaryStatusTempElement = new DebitItemSalaryStatusView(this.#dataWork[index].salary);
      replace(salaryStatusTempElement, this.#salaryStatusElement);
      this.#salaryStatusElement = salaryStatusTempElement;
  }

  #count = 0;

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

// счетчик дней и актуализация статистики баланса
  setDayExperience(daySize = DAY_SIZE) {
    setInterval(() => {
      ++this.#count;
      this.#dataUser = {...this.#dataUser, days: this.#count};
      this.#dataUser = {...this.#dataUser, dayCountDurCoin: 0};
      this.#dataUser = {...this.#dataUser, dayCountBikCoin: 0};
      this.#dataUser = {...this.#dataUser, dayCountDollar: 0};
      this.#dataUser = {...this.#dataUser, dayCountOil: 0};
      this.#dataUser = {...this.#dataUser, dayCountGold: 0};
      let dayAfloatTempElement = new DayAfloatView(this.#dataUser);
      replace(dayAfloatTempElement, this.#dayAfloatElement);
      this.#dayAfloatElement = dayAfloatTempElement;
      this.#setStatisticAllMoney();
      this.#setNewDataConfigChart()

      console.log(this.#configChart)

    }, daySize);
  }

  setGenderOfAppStartPresenter(data) {
    this.#dataUser = {...data};
    console.log(this.#dataUser);
  }

  //актуализация статистики баланса
  #setStatisticAllMoney() {
    let currentCryptans = this.#dataUser.cryptans;
    let currentSalaty = this.#dataUser.salary;
    let currentCarCredit = this.#dataUser.carCredit;
    let currentHomeCredit = this.#dataUser.homeCredit;
    let allCredit = currentCarCredit + currentHomeCredit;
    this.#dataUser = {...this.#dataUser, cryptans: currentCryptans + currentSalaty - allCredit}
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

  init() {
    //***************** HEADER *****************//

    // this.#dataUser = startData;

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
    this.#workFieldPresenter = new WorkFieldPresenter(this.#actualDataUser, this.#dataWork, this.#headFiledElement, this.#siteMainElement, this.#setCurrentPropertyUser, this.#setSalaryForRender);
    this.#workFieldPresenter.init();

    // Тапай ДурКоин - дочерний презентер
    this.#durCoinFieldPresenter = new DurCoinFieldPresenter(this.#actualDataUser, this.#headFiledElement, this.#setCurrentPropertyUser, this.#setDebitItemDurCoinFieldValue);
    this.#durCoinFieldPresenter.init();

    // КриптоБыржа - дочерний презентер
    this.#cryptoFieldPresenter = new CryptoFieldPresenter(this.#actualDataUser, this.#configChart, this.#headFiledElement, this.#setCurrentPropertyUser, this.#setDebitItemDurCoinFieldValue, this.#setDebitItemBikCoinFieldValue, this.#setDebitItemDollarFieldValue, this.#setDebitItemOilFieldValue, this.#setDebitItemGoldFieldValue, this.#setDataMinusAllMoney, this.#setDataPlusAllMoney);
    this.#cryptoFieldPresenter.init();

    // Банк - дочерний презентер
    this.#bankFieldPresenter = new BankFieldPresenter(this.#headFiledElement);
    this.#bankFieldPresenter.init();

    // Моя хата - дочерний презентер
    this.#homeFieldPresenter = new HomeFieldPresenter(this.#actualDataUser, this.#headFiledElement, this.#setDataMinusAllMoney, this.#setCurrentPropertyUser, this.#setCreditItemHomeCreditValue);
    this.#homeFieldPresenter.init();

    //Расходы - Моя тачка - дочерний презентер
    this.#expensesCarHeadFieldPresenter = new CarFieldPresenter(this.#actualDataUser, this.#headFiledElement, this.#setDataMinusAllMoney, this.#setCurrentPropertyUser, this.#setCreditItemCarCreditValue);
    this.#expensesCarHeadFieldPresenter.init();

    // Любовь - дочерний презентер
    this.#loveFieldPresenter = new LoveFieldPresenter(this.#dataUser, this.#headFiledElement);
    this.#loveFieldPresenter.init();

    // Мой досуг - дочерний презентер
    this.#dosugFieldPresenter = new DosugFieldPresenter(this.#headFiledElement);
    this.#dosugFieldPresenter.init();

    //***************** FOOTER *****************//
    // статистика доходов (левый блок) расходов (правый блок)
    this.#leftBlockFooterElement = new FooterLeftBlockView();
    render(this.#leftBlockFooterElement, this.#siteFooterElement);

    this.#rightBlockFooterElement = new FooterRightBlockView();
    render(this.#rightBlockFooterElement, this.#siteFooterElement);

    // Приход - debit-list

    this.#footerDebitListElement = new FooterDebitListView(this.#dataUser);
    render(this.#footerDebitListElement, this.#leftBlockFooterElement.element);

    //Всего на счету:
    this.#statisticAllMoneyElement = new DebitItemCryptansStatusView(this.#dataUser);
    render(this.#statisticAllMoneyElement, this.#footerDebitListElement.element);

    // Зарплата/оклад
    this.#salaryStatusElement = new DebitItemSalaryStatusView;
    render(this.#salaryStatusElement, this.#footerDebitListElement.element);

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
    render(this.#footerCreditListElement, this.#rightBlockFooterElement.element);

    // На тачку:
    this.#creditItemCarCreditElement = new CreditItemCarCreditView(this.#actualDataUser);
    render(this.#creditItemCarCreditElement, this.#footerCreditListElement.element);

    // На хату:
    this.#creditItemHomeCreditElement = new CreditItemHomeCreditView(this.#actualDataUser);
    render(this.#creditItemHomeCreditElement, this.#footerCreditListElement.element);

    // График цен на крипту

    this.#chartPresenter = new ChartPresenter(this.#dataUser, this.#configChart, this.#siteFooterElement.parentElement.querySelector('.footer__container-canvas'), );
    this.#chartPresenter.init();
  }
}
