import { Menu } from "./core/menu";
import { BackgroundModule } from "./modules/background-module";

const backgroundModule = new BackgroundModule("background", "Случайный фон");

const modules = [backgroundModule];

export class ContextMenu extends Menu {
  constructor(selector) {
    super(selector);
  }

  open() {
    document.body.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.el.classList.add("open");
      this.el.style.top = `${event.y}px`;
      this.el.style.left = `${event.x}px`;
    });

    document.body.addEventListener("click", (event) => {
      if (event.button !== 2) {
        this.el.classList.remove("open");
      }
    });
  }

  close() {
    this.el.classList.remove("open");
  }

  add() {
    modules.forEach((module) => {
      this.el.insertAdjacentHTML("beforeend", module.toHTML());
    });
  }

  trigger() {
    modules.forEach((module) => module.trigger());
  }
}
