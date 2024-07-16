import {render, replace, remove} from "../framework/render";
import FooterChartView from "../view/footer/footer-chart-view";
import {Chart} from "chart.js";
import {configChart} from "../mock/config-chart";


export default class ChartPresenter {
  #element = null;
  #container = null;
  #dataUser = null;
  #configChart = null;

  #chart = null;

  constructor(dataUser, configChart, container) {
    this.#dataUser = dataUser;
    this.#configChart = configChart
    this.#container = container;
  }

  init() {
    this.#configChart = configChart;
    this.#element = new FooterChartView;
    render(this.#element, this.#container);
    this.#chart = new Chart(this.#element.element, this.#configChart);
  }

  update(newConfigChart) {
    this.#chart.destroy();
    this.#chart = new Chart(this.#element.element, newConfigChart);
  }
}
