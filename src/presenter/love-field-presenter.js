import {render, replace, remove} from "../framework/render";
import {LoveFieldView} from "../view/head-field/love-field-view";
import {LoveSelectedView} from "../view/head-field/love-selected-view";
import {addOverlay, removeOverlay} from "../utils/utils";
import Swiper from "swiper";
import {Navigation, Pagination} from 'swiper/modules';
import DebitItemGoldStatusView from "../view/footer/debit-item-gold-status-view";
import {dataUser} from "../mock/data-user";

export default class LoveFieldPresenter {
  #element = null;
  #container = null;
  #dataUser = null;
  #setCurrentPropertyUser = null;
  #setStatisticMinusAllMoneyForCryptoBit = null;
  #setCreditItemLoveValue = null;
  #swiperElement = null;
  #swiper = null;


  #loveSelectElement = null;

  constructor(dataUser, container, setCurrentPropertyUser, setStatisticMinusAllMoneyForCryptoBit, setCreditItemLoveValue) {
    this.#dataUser = dataUser;
    this.#container = container;
    this.#setCurrentPropertyUser = setCurrentPropertyUser;
    this.#setStatisticMinusAllMoneyForCryptoBit = setStatisticMinusAllMoneyForCryptoBit;
    this.#setCreditItemLoveValue = setCreditItemLoveValue;
  }

  init() {
    this.#element = new LoveFieldView(this.#dataUser());
    render(this.#element, this.#container.element);
    this.#element.setLoveFieldHandler(this.#handleLoveField);
  }

  #rerenderLoveField = () => {
    let tempElement = new LoveFieldView(this.#dataUser());
    replace(tempElement, this.#element);
    this.#element = tempElement;
    this.#element.setLoveFieldHandler(this.#handleLoveField);
  }

  #handleLoveField = () => {
    this.#loveSelectElement = new LoveSelectedView();
    render(this.#loveSelectElement, this.#container.element);
    this.#loveSelectElement.setLoveCloseBtnHandler(this.#handleCloseBtnLoveSelect);
    // this.#loveSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectLove);
    this.#loveSelectElement.setSelectLoveHandler(this.#handleSelectLove);

    this.#swiperElement = this.#loveSelectElement.element.querySelector('.swiper_main');
    this.#swiper = new Swiper(this.#swiperElement, {
      modules: [Navigation, Pagination],
      spaceBetween: 10,
      keyboardControl: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    })
    addOverlay();

    //Разблокировка кнопки выбора жены
    let userData = this.#dataUser();
    this.#loveSelectElement.element.querySelectorAll('.container-dataset').forEach((el, index) => {
      let count = 0;

      for (let key in el.dataset) {
        for (let keyData in userData) {
          if (key === keyData && typeof el.dataset[key] === 'string' && el.dataset[key] === userData[keyData]) {
            count++;
          }
          if (key === keyData && typeof userData[keyData] === 'number' && Number(el.dataset[key]) <= Number(userData[keyData])) {
            count++;
          }
          if (count === Number(Object.keys(el.dataset).length)) {
            this.#loveSelectElement.element.querySelectorAll('.swiper-slide__description-container-button')[index].style.opacity = '1';
            this.#loveSelectElement.element.querySelectorAll('.swiper-slide__description-container-button')[index].style.pointerEvents = 'auto';
            break;
          }
        }
      }

      if (userData.love === el.getAttribute('id')) {
        el.parentNode.style.opacity = '0.5';
        el.parentNode.classList.add('love');
        el.parentNode.querySelector('.swiper-slide__description-container-button').style.pointerEvents = 'none';
      }
    });
  }

  #removeLoveSelectElement = () => {
    remove(this.#loveSelectElement);
    this.#element.setLoveFieldHandler(this.#handleLoveField);
    removeOverlay();
  }

  #handleCloseBtnLoveSelect = () => {
    this.#removeLoveSelectElement();
  }

  #onEscKeyDownForSelectLove = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeLoveSelectElement();
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectLove);
    }
  };

  #handleSelectLove = (evt) => {
    console.log(evt.target.dataset.name)
    this.#setCurrentPropertyUser('love', String(evt.target.dataset.name));
    this.#setCurrentPropertyUser('loveCredit', Number(evt.target.dataset.expenses));
    this.#setCreditItemLoveValue(this.#dataUser);
    this.#rerenderLoveField();

    console.log('love')
    console.log(this.#dataUser());
    this.#removeLoveSelectElement();
  }
}
