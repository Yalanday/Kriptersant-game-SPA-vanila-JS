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
import ChartPresenter from "./chart-presenter";

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
    this.#dataUser = {...this.#dataUser, cryptans: currentCryptans - sumMinus}
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
    console.log('Это проверка изменений глобоальных данных')
    console.log(this.#dataUser)
    console.log(this.#configChart)
  }

// счетчик дней и актуализация статистики баланса
  setDayExperience(daySize = DAY_SIZE) {
    setInterval(() => {
      ++this.#count;
      this.#dataUser = {...this.#dataUser, days: this.#count};
      let dayAfloatTempElement = new DayAfloatView(this.#dataUser);
      replace(dayAfloatTempElement, this.#dayAfloatElement);
      this.#dayAfloatElement = dayAfloatTempElement;
      this.#setStatisticAllMoney();

      this.#setNewDataConfigChart()

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

  #setDebitItemDurCoinFieldValue = () => {
    let debitItemDurCoinStatusTempElement = new DebitItemDurCoinStatusView(this.#dataUser);
    replace(debitItemDurCoinStatusTempElement, this.#debitItemDurCoinStatusElement);
    this.#debitItemDurCoinStatusElement = debitItemDurCoinStatusTempElement;
  }

  init() {
    //***************** HEADER *****************//

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
    this.#cryptoFieldPresenter = new CryptoFieldPresenter(this.#headFiledElement);
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

    this.#chartPresenter = new ChartPresenter(this.#dataUser, this.#configChart, this.#siteFooterElement.parentElement, );
    this.#chartPresenter.init();
  }
}
