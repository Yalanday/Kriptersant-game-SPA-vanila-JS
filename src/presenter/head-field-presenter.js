import {render, replace, remove} from "../framework/render";
import {HeadFildView} from "../view/head-field/head-field-view";
import {WorkFieldView} from "../view/head-field/work-field-view";
import {WorkSelectFieldView} from "../view/head-field/work-select-field-view";
import DebitItemCryptansStatusView from "../view/footer/debit-item-cryptans-status-view";
import DebitItemSalaryStatusView from "../view/footer/debit-item-salary-status-view";
import DayAfloatView from "../view/header/dat-afloay-view";
import {DAY_SIZE} from "../utils/utils";
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

export default class HeadFieldPresenter {
  //данные
  #dataUser = null;
  #dataWork = null;

  //дочерние презентеры
  #expensesCarHeadFieldPresenter = null;
  #bankFieldPresenter = null;
  #loveFieldPresenter = null;
  #cryptoFieldPresenter = null;
  #homeFieldPresenter = null;

  //контейнеры
  #headFiledElement = null;
  #siteMainElement = null;
  #siteFooterElement = null;
  #dayAfloatContainer = null;

  //создаваемые элементы
  #workFieldElement = null;
  #workSelectElement = null;
  #statisticAllMoneyElement = null;
  #salaryStatusElement = null;
  #dayAfloatElement = null;
  #leftBlockFooterElement = null;
  #rightBlockFooterElement = null;
  #footerCreditListElement = null;
  #footerDebitListElement = null;
  #creditItemCarCreditElement = null;


  // переменные для формирования первоночальных Должности и оклада
  #workForRender = null;
  #salaryForRender = null;

  constructor(dataUser, dataWork, siteMainElement, siteFooterElement, dayAfloatContainer) {
    this.#dataUser = dataUser;
    this.#dataWork = dataWork;
    this.#siteMainElement = siteMainElement;
    this.#siteFooterElement = siteFooterElement;
    this.#dayAfloatContainer = dayAfloatContainer;
  }

  //установщик работы и зарплаты
  #setWorkSalaryForRender(index = 0) {
    if (this.#workFieldElement === null) {
      this.#workForRender = this.#dataWork[index].work
      this.#salaryForRender = this.#dataWork[index].salary;
    } else {
      this.#workForRender = this.#dataWork[index].work
      this.#salaryForRender = this.#dataWork[index].salary;
      let workFieldTempElement = new WorkFieldView(this.#dataWork, this.#dataWork[index].work);
      let salaryStatusTempElement = new DebitItemSalaryStatusView(this.#dataWork[index].salary);
      replace(workFieldTempElement, this.#workFieldElement);
      replace(salaryStatusTempElement, this.#salaryStatusElement);
      this.#workFieldElement = workFieldTempElement;
      this.#salaryStatusElement = salaryStatusTempElement;
    }
  }

  #count = 0;

  //передача актуального стейта
  #actualDataUser = () => {
    return this.#dataUser;
  }

  //минусация при покупках
  #setDataMinusAllMoney = (sumMinus = 0) => {
    let currentCryptans = this.#dataUser.cryptans;
    this.#dataUser = {...this.#dataUser, cryptans: currentCryptans - sumMinus}
    this.#setStatisticAllMoney()
  }

  //установка новых значений имущества dataUser
  #setCurrentPropertyUser = (property = '', value) => {
    let state = this.#dataUser;
    for (let key in state) {
      if (key === property) {
        state[key] = value;
      }
    }
    this.#dataUser = {...state};
    console.log(this.#dataUser)
  }

// счетчик дней и актуализация статистики баланса
  setDayExperience(daySize = DAY_SIZE) {
    setInterval(() => {
      ++this.#count;
      this.#dataUser = {...this.#dataUser, days: this.#count};
      let dayAfloatTempElement = new DayAfloatView(this.#dataUser);
      replace(dayAfloatTempElement, this.#dayAfloatElement);
      this.#dayAfloatElement = dayAfloatTempElement;
      this.#setStatisticAllMoney()
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
    let currentCarCredit = this.#dataUser.carCredit
    this.#dataUser = {...this.#dataUser, cryptans: currentCryptans + currentSalaty - currentCarCredit}
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

    //установка начальных статусов работы и зарплаты
    this.#setWorkSalaryForRender()

    //поле кнопка "Работа"
    this.#workFieldElement = new WorkFieldView;
    render(this.#workFieldElement, this.#headFiledElement.element);
    this.#workFieldElement.setWorkFieldHandler(this.#handleWorkField);

    //Расходы - Моя тачка - дочерний презентер
    this.#expensesCarHeadFieldPresenter = new CarFieldPresenter(this.#actualDataUser, this.#headFiledElement, this.#setDataMinusAllMoney, this.#setCurrentPropertyUser, this.#setCreditItemCarCreditValue);
    this.#expensesCarHeadFieldPresenter.init();

    // Банк - дочерний презентер
    this.#bankFieldPresenter = new BankFieldPresenter(this.#headFiledElement);
    this.#bankFieldPresenter.init();

    // Любовь - дочерний презентер
    this.#loveFieldPresenter = new LoveFieldPresenter(this.#dataUser, this.#headFiledElement);
    this.#loveFieldPresenter.init();

    // КриптоБыржа - дочерний презентер
    this.#cryptoFieldPresenter = new CryptoFieldPresenter(this.#headFiledElement);
    this.#cryptoFieldPresenter.init();

    // Моя хата - дочерний презентер
    this.#homeFieldPresenter = new HomeFieldPresenter(this.#headFiledElement);
    this.#homeFieldPresenter.init();

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


    // Расход - credit-list
    this.#footerCreditListElement = new FooterCreditListView();
    render(this.#footerCreditListElement, this.#rightBlockFooterElement.element);

    // На тачку:
    this.#creditItemCarCreditElement = new CreditItemCarCreditView(this.#actualDataUser);
    render(this.#creditItemCarCreditElement, this.#footerCreditListElement.element);
  }

  // методы раздела про работу
  #handleWorkField = () => {
    this.#workSelectElement = new WorkSelectFieldView(this.#actualDataUser, this.#dataWork)
    render(this.#workSelectElement, this.#siteMainElement);
    this.#workSelectElement.setWorkSelectHandler(this.#handleWorkSelect);
    this.#workSelectElement.setCloseBtnHandler(this.#handleCloseBtnWorkSelect);
    this.#workSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectWork);

  }

  //выбор работы
  #handleWorkSelect = (index) => {
    this.#setWorkSalaryForRender(index)
    this.#dataUser = {...this.#dataUser, salary: this.#salaryForRender};
    remove(this.#workSelectElement);
    this.#setCurrentPropertyUser('work', this.#dataWork[index].work)

    this.#workFieldElement.setWorkFieldHandler(this.#handleWorkField);

  }

  //кнопка закрытия поля выбор работы
  #handleCloseBtnWorkSelect = () => {
    remove(this.#workSelectElement);
    this.#workFieldElement.setWorkFieldHandler(this.#handleWorkField);
  }

  #onEscKeyDownForSelectWork = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#workSelectElement);
      this.#workFieldElement.setWorkFieldHandler(this.#handleWorkField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectWork);
    }
  };

}
