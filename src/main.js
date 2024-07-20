import {dataUser} from "./mock/data-user";
import {dataWork} from "./mock/data-work";
import AppStartPresenter from "./presenter/app-start-presenter";
import HeadFieldPresenter from "./presenter/head-field-presenter";
import {configChart} from "./mock/config-chart";


export const bodyElement = document.querySelector('body');
export const overlayBodyElement = bodyElement.querySelector('.body-overlay');
export const siteHeaderElement = bodyElement.querySelector('.header');
export const avatarNameContainer = siteHeaderElement.querySelector('.header__user-section');
export const dayAfloatContainer = siteHeaderElement.querySelector('.header__right-section');
export const siteMainElement = bodyElement.querySelector('.main__container');
export const siteFooterElement = bodyElement.querySelector('.footer__container');
export const audioSoundElement = document.getElementById('audio');

export const saveButton = document.getElementById('save-button');
export const loadButton = document.getElementById('load-button');

const headFieldPresenter = new HeadFieldPresenter(dataUser, dataWork, configChart, siteMainElement, siteFooterElement, dayAfloatContainer);
// const appStartPresenter = new AppStartPresenter(dataUser, bodyElement, avatarNameContainer, headFieldPresenter);
// const appStartPresenter = new AppStartPresenter(dataUser, bodyElement, avatarNameContainer);


// appStartPresenter.init();
headFieldPresenter.init();





