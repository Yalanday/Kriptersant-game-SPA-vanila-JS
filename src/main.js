import { dataUser } from "./mock/data-user";
import {dataWork} from "./mock/data-work";
import AppStartPresenter from "./presenter/app-start-presenter";
import HeadFieldPresenter from "./presenter/head-field-presenter";
import ExpensesHeadFieldPresenter from "./presenter/expenses-car-field-presenter";

const bodyElement = document.querySelector('body');
const siteHeaderElement = bodyElement.querySelector('.header');
const avatarNameContainer = siteHeaderElement.querySelector('.header__user-section');
const dayAfloatContainer = siteHeaderElement.querySelector('.header__right-section');
const siteMainElement = bodyElement.querySelector('.main__container');
const siteFooterElement = bodyElement.querySelector('.footer__container');

// const expensesHeadFieldPresenter = new ExpensesHeadFieldPresenter();
const headFieldPresenter = new HeadFieldPresenter(dataUser, dataWork, siteMainElement, siteFooterElement, dayAfloatContainer);
const appStartPresenter = new AppStartPresenter(dataUser, bodyElement, avatarNameContainer, headFieldPresenter);


appStartPresenter.init();
// headFieldPresenter.init();

