import {render, replace, remove} from "../framework/render";
import {CryptoFieldView} from "../view/head-field/crypto-field-view";
import {CryptoSelectedView} from "../view/head-field/crypto-selected-view";
import {addOverlay, removeOverlay} from "../utils/utils";
import {audioSoundElement} from "../main";


export default class CryptoFieldPresenter {
  #dataUser = null;
  #element = null;
  #container = null;
  #configChart = null;
  #setCurrentPropertyUser = null;
  #setDebitItemDurCoinFieldValue = null;
  #setDebitItemBikCoinFieldValue = null;
  #setDebitItemDollarFieldValue = null;
  #setDebitItemOilFieldValue = null;
  #setDebitItemGoldFieldValue = null;
  #setDataMinusAllMoney = null;
  #setDataPlusAllMoney = null;

  #cryptoSelectElement = null;


  constructor(dataUser, configChart, container, setCurrentPropertyUser, setDebitItemDurCoinFieldValue, setDebitItemBikCoinFieldValue, setDebitItemDollarFieldValue, setDebitItemOilFieldValue, setDebitItemGoldFieldValue, setDataMinusAllMoney, setDataPlusAllMoney) {
    this.#dataUser = dataUser;
    this.#configChart = configChart;
    this.#container = container;
    this.#setCurrentPropertyUser = setCurrentPropertyUser;
    this.#setDebitItemDurCoinFieldValue = setDebitItemDurCoinFieldValue;
    this.#setDebitItemBikCoinFieldValue = setDebitItemBikCoinFieldValue;
    this.#setDebitItemDollarFieldValue = setDebitItemDollarFieldValue;
    this.#setDebitItemOilFieldValue = setDebitItemOilFieldValue;
    this.#setDebitItemGoldFieldValue = setDebitItemGoldFieldValue;
    this.#setDataMinusAllMoney = setDataMinusAllMoney;
    this.#setDataPlusAllMoney = setDataPlusAllMoney;
  }

  init() {
    this.#element = new CryptoFieldView;
    render(this.#element, this.#container.element);
    this.#element.setCryptoFieldHandler(this.#handleCryptoField);
  }

  #handleCryptoField = () => {
    this.#cryptoSelectElement = new CryptoSelectedView(this.#configChart);
    render(this.#cryptoSelectElement, this.#container.element);
    this.#cryptoSelectElement.setCryptoCloseBtnHandler(this.#handleCloseBtnCryptoSelect);
    this.#cryptoSelectElement.setEscKeydownHandler(this.#onEscKeyDownForSelectCrypto);
    this.#cryptoSelectElement.setSelectCryptoHandler(this.#handleSelectCrypto);
    addOverlay();
  }

  #handleCloseBtnCryptoSelect = () => {
    remove(this.#cryptoSelectElement);
    this.#element.setCryptoFieldHandler(this.#handleCryptoField);
    removeOverlay();
  }

  #onEscKeyDownForSelectCrypto = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#cryptoSelectElement);
      this.#element.setCryptoFieldHandler(this.#handleCryptoField);
      document.removeEventListener('keydown', this.#onEscKeyDownForSelectCrypto);
      removeOverlay();
    }
  };

  #handleSelectCrypto = (evt, price, sale, type) => {

    // считаем ДурКоины
    if (sale === 'false' && type === 'durCoin' && +this.#dataUser().dayCountDurCoin < 10 && +this.#dataUser().cryptans >= Number(price)) {
      let newValueDurCoin = +this.#dataUser().durCoin + 1;
      let newValueDayCountDurCoin = +this.#dataUser().dayCountDurCoin + 1;
      this.#setCurrentPropertyUser('durCoin', +newValueDurCoin);
      this.#setCurrentPropertyUser('dayCountDurCoin', +newValueDayCountDurCoin);
      this.#setDataMinusAllMoney(price);
      this.#setDebitItemDurCoinFieldValue();
    }
    if (sale === 'true' && type === 'durCoin' && +this.#dataUser().durCoin > 0) {
      let newValueDurCoin = +this.#dataUser().durCoin - 1;
      this.#setCurrentPropertyUser('durCoin', +newValueDurCoin);
      this.#setDataPlusAllMoney(price);
      this.#setDebitItemDurCoinFieldValue();
    }

    // считаем БыкКоины
    if (sale === 'false' && type === 'bikCoin' && +this.#dataUser().dayCountBikCoin < 10 && +this.#dataUser().cryptans >= Number(price)) {
      let newValueBikCoin = +this.#dataUser().bikCoin + 1;
      let newValueDayCountBikCoin = +this.#dataUser().dayCountBikCoin + 1;
      this.#setCurrentPropertyUser('bikCoin', +newValueBikCoin);
      this.#setCurrentPropertyUser('dayCountBikCoin', +newValueDayCountBikCoin);
      this.#setDataMinusAllMoney(price);
      this.#setDebitItemBikCoinFieldValue();
    }
    if (sale === 'true' && type === 'bikCoin' && +this.#dataUser().bikCoin > 0) {
      let newValueBikCoin = +this.#dataUser().bikCoin - 1;
      this.#setCurrentPropertyUser('bikCoin', +newValueBikCoin);
      this.#setDataPlusAllMoney(price);
      this.#setDebitItemBikCoinFieldValue();
    }

    // считаем Доллар
    if (sale === 'false' && type === 'dollar' && +this.#dataUser().dayCountDollar < 10 && +this.#dataUser().cryptans >= Number(price)) {
      let newValueDollar = +this.#dataUser().dollar + 1;
      let newValueDayCountDollar = +this.#dataUser().dayCountDollar + 1;
      this.#setCurrentPropertyUser('dollar', +newValueDollar);
      this.#setCurrentPropertyUser('dayCountDollar', +newValueDayCountDollar);
      this.#setDataMinusAllMoney(price);
      this.#setDebitItemDollarFieldValue();
    }
    if (sale === 'true' && type === 'dollar' && +this.#dataUser().dollar > 0) {
      console.log('saleeeeee')
      let newValueDollar = +this.#dataUser().dollar - 1;
      this.#setCurrentPropertyUser('dollar', +newValueDollar);
      this.#setDataPlusAllMoney(price);
      this.#setDebitItemDollarFieldValue();
    }

    // считаем Нефть
    if (sale === 'false' && type === 'oil' && +this.#dataUser().dayCountOil < 10 && +this.#dataUser().cryptans >= Number(price)) {
      let newValueOil = +this.#dataUser().oil + 1;
      let newValueDayCountOil = +this.#dataUser().dayCountOil + 1;
      this.#setCurrentPropertyUser('oil', +newValueOil);
      this.#setCurrentPropertyUser('dayCountOil', +newValueDayCountOil);
      this.#setDataMinusAllMoney(price);
      this.#setDebitItemOilFieldValue();
    }
    if (sale === 'true' && type === 'oil' && +this.#dataUser().oil > 0) {
      console.log('saleeeeee')
      let newValueOil = +this.#dataUser().oil - 1;
      this.#setCurrentPropertyUser('oil', +newValueOil);
      this.#setDataPlusAllMoney(price);
      this.#setDebitItemOilFieldValue();
    }

    // считаем Золото
    if (sale === 'false' && type === 'gold' && +this.#dataUser().dayCountGold < 10 && +this.#dataUser().cryptans >= Number(price)) {
      let newValueGold = +this.#dataUser().gold + 1;
      let newValueDayCountGold = +this.#dataUser().dayCountGold + 1;
      this.#setCurrentPropertyUser('gold', +newValueGold);
      this.#setCurrentPropertyUser('dayCountGold', +newValueDayCountGold);
      this.#setDataMinusAllMoney(price);
      this.#setDebitItemGoldFieldValue();
    }
    if (sale === 'true' && type === 'gold' && +this.#dataUser().gold > 0) {
      console.log('saleeeeee')
      let newValueGold = +this.#dataUser().gold - 1;
      this.#setCurrentPropertyUser('gold', +newValueGold);
      this.#setDataPlusAllMoney(price);
      this.#setDebitItemGoldFieldValue();
    }

    if (+this.#dataUser().dayCountGold === 10 && type === 'gold' && sale === 'false' ||
        +this.#dataUser().dayCountOil === 10 && type === 'oil' && sale === 'false' ||
        +this.#dataUser().dayCountBikCoin === 10 && type === 'bikCoin' && sale === 'false' ||
        +this.#dataUser().dayCountDurCoin === 10 && type === 'durCoin' && sale === 'false' ||
        +this.#dataUser().dayCountDollar === 10 && type === 'dollar' && sale === 'false') {
      audioSoundElement.play();
    }

  }
}
