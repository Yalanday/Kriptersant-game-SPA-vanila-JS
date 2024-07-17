// import Swiper from'swiper';
// import 'swiper/css';
import 'swiper/css/bundle';

const womanData = [
  {
    name: 'Милфа',
    price: 0,
    expenses: 0,
    url: 'girl/milf',
    description: 'Милфа всё сделает сама. Платить не надо. Может даже денег дать.',
  },
  {
    name: 'Дерёвня',
    price: 30000,
    expenses: 3000,
    url: 'girl/kholhoz',
    description: 'Скромна, неприхотлива, но может сойти с ума от жизни в городе и превратиться в инстасамку.'
  },
  {
    name: 'Классная',
    price: 100000,
    expenses: 8000,
    url: 'girl/cool',
    description: 'На самом деле она для любви. Но ты молод и глуп и этого еще не понимаешь.',
  },
  {
    name: 'Инстасамка',
    price: 500000,
    expenses: 200000,
    url: 'girl/elita',
    description: 'Заветная современная мечта прыщавых! Только если ты "настоящий мужчина"',
  },
  {
    name: 'Для любви',
    price: 1000000,
    expenses: 200000,
    url: 'girl/super',
    description: 'Та самая классная, которую ты просрал в лучшие годы. Но теперь она стоит гораздо дороже и не только в материальной валюте.',
  },
]


const createItemLoveSlide = (data) => {
  return `<div class="swiper-slide">
            <img src="/images/love/${data.url}.jpg">
            <div class="swiper-slide__description-container">
                <p class="swiper-slide__description-name">${data.name}</p>
                <p>${data.description}</p>
                <p>Стоимость: ${data.price}</p>
                <p>Содержание в день: ${data.expenses}</p>
                <button class="swiper-slide__description-container-button">Выбрать</button>
            </div>
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


