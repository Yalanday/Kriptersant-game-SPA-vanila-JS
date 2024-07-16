import {overlayBodyElement} from "../main";

const DAY_SIZE = 3000;

const addOverlay = () => {
  overlayBodyElement.classList.add("active");
}

const removeOverlay = () => {
  overlayBodyElement.classList.remove("active");
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {
  DAY_SIZE,
  addOverlay,
  removeOverlay,
  getRandomInRange
}
