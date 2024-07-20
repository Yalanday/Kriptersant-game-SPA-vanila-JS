// import Swiper from'swiper';
// import 'swiper/css';
import 'swiper/css/bundle';

const womanData = [
  {
    name: 'Милфа',
    expenses: 0,
    url: 'girl/milf',
    description: 'Милфа всё сделает сама. Платить ей не надо. Может даже денег дать.',
    requirements: ['Приорка', 'Хрущ', 'на счете 100 000'],
    car: 'Приорка',
    home: 'Хрущ',
    cryptans: 100000,
    books: 0,
    carma: 0,
    biceps: 0,
  },
  {
    name: 'Дерёвня',
    expenses: 10000,
    url: 'girl/kholhoz',
    description: 'Скромна, неприхотлива, но может сойти с ума от жизни в городе и превратиться в инстасамку.',
    requirements: ['Китаец', 'Евродвушка', 'на счете 200 000', 'Бицуха 25'],
    car: 'Китаец',
    home: 'Евродвушка',
    cryptans: 200000,
    books: 0,
    carma: 0,
    biceps: 25,
  },
  {
    name: 'Классная',
    expenses: 20000,
    url: 'girl/cool',
    description: 'На самом деле она для любви. Но ты молод и глуп и этого еще не понимаешь.',
    requirements: ['Японец', 'Двухуровневка', 'на счете 300 000', '10 книг', 'Святость 10'],
    car: 'Японец',
    home: 'Двухуровневка',
    cryptans: 300000,
    books: 10,
    carma: 10,
    biceps: 0,
  },
  {
    name: 'Инстасамка',
    expenses: 100000,
    url: 'girl/elita',
    description: 'Заветная современная мечта прыщавых! Только если ты "настоящий мужчина"',
    requirements: ['Немец', 'Котедж', 'на счете 1 000 000', 'Бицуха 30' ],
    car: 'Немец',
    home: 'Котедж',
    cryptans: 1000000,
    books: 0,
    carma: 0,
    biceps: 30,
  },
  {
    name: 'Для любви',
    expenses: 200000,
    url: 'girl/super',
    description: 'Та самая классная, которую ты просрал в лучшие годы. Но теперь она стоит гораздо дороже и не только в материальной валюте.',
    requirements: ['Ламба', 'Дворец в Дубае', 'на счете 5 000 000', '20 книг', 'Бицуха 40', 'Святость 20'],
    car: 'Ламба',
    home: 'Дворец в Дубае',
    cryptans: 5000000,
    books: 20,
    carma: 20,
    biceps: 40,
  },
]

const createItemLoveSlide = (data) => {
  return `<div style = "position: relative;" class="swiper-slide swiper-slide--love">
            <img src="/images/love/${data.url}.jpg">
            <div class="swiper-slide__description-container">
                <p class="swiper-slide__description-name">${data.name}</p>
                <p>${data.description}</p>
                <p>Содержание в день: ${data.expenses}</p>
                <p>Требования: ${data.requirements.join(", ")}</p>
                <button data-name="${data.name}" data-expenses="${data.expenses}" class="swiper-slide__description-container-button">Выбрать</button>
            </div>
          <div id="${data.name}"  data-car="${data.car}" data-home="${data.home}" data-cryptans="${data.cryptans}" data-books="${data.books}" data-carma="${data.carma}" data-biceps="${data.biceps}"  class="container-dataset" style = "position: absolute; top: 0; right: 0; left: 0; bottom: 0; background-color: rgba(255, 255, 255, 0);"></div>
          </div>`
}

export const createLoveSelectTemplate = () => {

  let slides = womanData.map((item) => {return createItemLoveSlide(item)}).join("");

  return `<div class="head-field__work-select-container head-field__work-select-container--love">
                <button class="head-field__close-work-select">&#10006;</button>

                <h3 class="head-field__select-title">У тебя еще нет своей половины, заведём? Имей ввиду, за удовольствие надо платить.</h3>

                <div class="swiper-container">

                    <div class="swiper swiper_main">
                        <div class="swiper-wrapper">
                            ${slides}                            
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
              
                </div>
               
            </div>`
}


