export default class Audio {
  #element;
  constructor(element) {
    this.#element = element;
  }

  #innerHtmlAudio() {
    return `
        <div class="panel-record invisible">
            <div class="record"></div>
            <div class="time-record">00:00</div>
            <div class="stop"></div>
        </div>
    `;
  }

  bindToDom() {
    const htmlAudio = this.#innerHtmlAudio();
    this.#element.insertAdjacentHTML("beforeend", htmlAudio);

    this.panelRecord = this.#element.querySelector(".panel-record");
    this.record = this.#element.querySelector(".record");
    this.timeRecord = this.#element.querySelector(".time-record");
    this.stop = this.#element.querySelector(".stop");
  }

  visiblePanelRecord() {
    this.panelRecord.classList.toggle("invisible");
  }
}
