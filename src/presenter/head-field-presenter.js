import {render, replace, remove} from "../framework/render";
import {HeadFildView} from "../view/head-field/head-field-view";
import {WorkFieldView} from "../view/head-field/work-field-view";
import {WorkSelectFieldView} from "../view/head-field/work-select-field-view";
import CryptansStatusView from "../view/footer/cryptans-status-view";
import SalaryStatusView from "../view/footer/salary-status-view";
import DayAfloatView from "../view/header/dat-afloay-view";
import {DAY_SIZE} from "../utils/utils";
import ExpensesHeadFieldPresenter from "./expenses-car-field-presenter";
import BankFieldPresenter from "./bank-field-presenter";
import LoveFieldPresenter from "./love-field-presenter";
import CryptoFieldPresenter from "./crypto-field-presenter";
import HomeFieldPresenter from "./home-field-presenter";


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
      let salaryStatusTempElement = new SalaryStatusView(this.#dataWork[index].salary);
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

  setGenderOfAppStartPresenter (data)
  {
    this.#dataUser = {...data};
    console.log(this.#dataUser);

  }
  //актуализация статистики баланса
  #setStatisticAllMoney() {
    let currentCryptans = this.#dataUser.cryptans;
    let currentSalaty = this.#dataUser.salary;
    this.#dataUser = {...this.#dataUser, cryptans: currentCryptans + currentSalaty}
    let statisticAllMoneyTempElement = new CryptansStatusView(this.#dataUser);
    replace(statisticAllMoneyTempElement, this.#statisticAllMoneyElement);
    this.#statisticAllMoneyElement = statisticAllMoneyTempElement;
  }

  init() {

    //статистика игровых дней
    this.#dayAfloatElement = new DayAfloatView(this.#dataUser);
    render(this.#dayAfloatElement, this.#dayAfloatContainer);

    //главное поле
    this.#headFiledElement = new HeadFildView;
    render(this.#headFiledElement, this.#siteMainElement);

    //статистика сколько всего крипты
    this.#statisticAllMoneyElement = new CryptansStatusView(this.#dataUser);
    render(this.#statisticAllMoneyElement, this.#siteFooterElement);

    //статистика какая зарплата
    this.#salaryStatusElement = new SalaryStatusView;
    render(this.#salaryStatusElement, this.#siteFooterElement);

    //счетчик дней
    this.setDayExperience(DAY_SIZE);

    //установка начальных статусов работы и зарплаты
    this.#setWorkSalaryForRender()

    //поле кнопка "Работа"
    this.#workFieldElement = new WorkFieldView;
    render(this.#workFieldElement, this.#headFiledElement.element);
    this.#workFieldElement.setWorkFieldHandler(this.#handleWorkField);

    //Расходы - Моя тачка - дочерний презентер
    this.#expensesCarHeadFieldPresenter = new ExpensesHeadFieldPresenter(this.#actualDataUser, this.#headFiledElement, this.#setDataMinusAllMoney, this.#setCurrentPropertyUser);
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
