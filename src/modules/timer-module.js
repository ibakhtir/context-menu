import { Module } from "../core/module";

export class TimerModule extends Module {
  constructor(type, text) {
    super(type, text);

    this.timer = document.createElement("div");
    this.timer.className = "timer";
    this.timer.innerHTML = TimerModule.getHTML();

    this.el = {
      minutes: this.timer.querySelector(".timer__part_minutes"),
      seconds: this.timer.querySelector(".timer__part_seconds"),
      input: this.timer.querySelector(".timer__input_text"),
      control: this.timer.querySelector(".timer__btn_control"),
      reset: this.timer.querySelector(".timer__btn_reset"),
      close: this.timer.querySelector(".timer__btn_close"),
    };

    this.interval = null;
    this.remainingSeconds = 0;

    this.el.input.addEventListener("change", (event) => {
      const { target } = event;
      const { value } = target;
      if (isFinite(value)) {
        this.remainingSeconds = Number(value);
      } else {
        this.el.input.value = null;
      }
    });

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.reset.addEventListener("click", () => {
      this.stop();
      this.remainingSeconds = 0;
      this.el.input.value = null;
      this.updateInterfaceTime();
    });

    this.el.close.addEventListener("click", () => {
      this.stop();
      this.remainingSeconds = 0;
      this.el.input.value = null;
      this.updateInterfaceTime();
      this.timer.remove();
    });
  }

  trigger() {
    const menuList = document.querySelector("[data-type = timer]");
    menuList.addEventListener("click", () => {
      document.body.append(this.timer);
    });
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer__btn_start");
      this.el.control.classList.remove("timer__btn_stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer__btn_stop");
      this.el.control.classList.remove("timer__btn_start");
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.updateInterfaceTime();

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.el.input.value = null;
        this.stop();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
      <div class="timer__part">
        <span class="timer__part timer__part_minutes">00</span>
        <span class="timer__part timer__part_separator">:</span>
        <span class="timer__part timer__part_seconds">00</span>
      </div>

      <div class="timer__input">
        <input
          type="text" 
          class="timer__input timer__input_text"
          placeholder="Enter seconds"
        >
      </div>

      <div class="timer__btn">
        <button type="button" class="timer__btn timer__btn_control timer__btn_start">
          <span class="material-icons">play_arrow</span>
        </button>
        <button type="button" class="timer__btn timer__btn_reset">
          <span class="material-icons">replay</span>
        </button>
        <button type="button" class="timer__btn timer__btn_close">
          <span class="material-icons">close</span>
        </button>
      </div>
    `;
  }
}
