import {render, replace, remove} from "../framework/render";
import {WorkFieldView} from "../view/head-field/work-field-view";
import {WorkSelectFieldView} from "../view/head-field/work-select-field-view";
import {addOverlay, removeOverlay} from "../utils/utils";

export default class WorkFieldPresenter {
  #dataUser = null;
  #dataWork = null;
  #element = null;
  #container = null;
  #siteMainElement = null;
  #workSelectElement = null;
  #setCurrentPropertyUser = null;
  #setSalaryForRender = null;
  #setStatisticAllMoneyForDeposit = null;


  constructor(dataUser, dataWork, container, siteMainElement, setCurrentPropertyUser, setSalaryForRender, setStatisticAllMoneyForDeposit) {
    this.#dataUser = dataUser;
    this.#dataWork = dataWork;
    this.#container = container;
    this.#siteMainElement = siteMainElement;
    this.#setCurrentPropertyUser = setCurrentPropertyUser;
    this.#setSalaryForRender = setSalaryForRender;
    this.#setStatisticAllMoneyForDeposit = setStatisticAllMoneyForDeposit;
  }

  #workForRender = null;
  #salaryForRender = null;

  #setWorkSalaryForRender(index = 0) {
    if (this.#element === null) {
      this.#workForRender = this.#dataWork[index].work
      this.#salaryForRender = this.#dataWork[index].salary;
    } else {
      this.#workForRender = this.#dataWork[index].work
      this.#salaryForRender = this.#dataWork[index].salary;


      let workFieldTempElement = new WorkFieldView(this.#dataUser(), this.#dataWork[index].work);
      replace(workFieldTempElement, this.#element);
      this.#element = workFieldTempElement;
      this.#setSalaryForRender(index);
    }
  }

  init() {
    this.#element = new WorkFieldView(this.#dataUser());
    render(this.#element, this.#container.element);
    this.#element.setWorkFieldHandler(this.#handleWorkField);
  }

  #handleWorkField = () => {
    this.#workSelectElement = new WorkSelectFieldView(this.#dataUser, this.#dataWork)
    render(this.#workSelectElement, this.#siteMainElement);
    this.#workSelectElement.setWorkSelectHandler(this.#handleWorkSelect);
    this.#workSelectElement.setCloseBtnHandler(this.#handleCloseBtnWorkSelect);
    // this.#workSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectWork);
    addOverlay()
  }

  //выбор работы
  #handleWorkSelect = (index) => {
    remove(this.#workSelectElement);
    this.#setCurrentPropertyUser('work', this.#dataWork[index].work);

    if (this.#dataUser().salary > 0) {
      let currentAllDeposit = Number(this.#dataUser().cryptansPlus);
      this.#setCurrentPropertyUser('cryptansPlus', currentAllDeposit - Number(this.#dataUser().salary));
    }

    this.#setCurrentPropertyUser('salary', +this.#dataWork[index].salary);
    this.#setWorkSalaryForRender();

    this.#setStatisticAllMoneyForDeposit(+this.#dataWork[index].salary)

    this.#element.setWorkFieldHandler(this.#handleWorkField);
    removeOverlay();


  }

  //кнопка закрытия поля выбор работы
  #handleCloseBtnWorkSelect = () => {
    remove(this.#workSelectElement);
    this.#element.setWorkFieldHandler(this.#handleWorkField);
    removeOverlay();
  }

  #onEscKeyDownForSelectWork = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#workSelectElement);
      this.#element.setWorkFieldHandler(this.#handleWorkField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectWork);
      removeOverlay();
    }
  };
}
