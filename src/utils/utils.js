import {overlayBodyElement} from "../main";

const DAY_SIZE = 3000;

export const addOverlay = () => {
  overlayBodyElement.classList.add("active");
}

export const removeOverlay = () => {
  overlayBodyElement.classList.remove("active");
}

export {DAY_SIZE}
