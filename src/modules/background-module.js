import { Module } from "../core/module";
import * as UTILS from "../utils";

export class BackgroundModule extends Module {
  constructor(type, text) {
    super(type, text);
  }

  trigger() {
    const menuList = document.querySelector("[data-type = background]");
    menuList.addEventListener("click", () => {
      document.body.style.background = `RGB(
        ${UTILS.random(0, 255)},
        ${UTILS.random(0, 255)},
        ${UTILS.random(0, 255)}
      )`;
      document.body.style.transition = "background 0.5s ease";
    });
  }
}
