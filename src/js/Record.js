export default class Record {
  #element;
  constructor(element) {
    this.#element = element;

    this.idSetInterval;
    this.stream;
    this.recorder;
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

  stopwatch() {
    let startTime = Date.now(),
      diff,
      minutes,
      seconds;
    this.idSetInterval = setInterval(() => {
      diff = Date.now() - startTime;
      minutes = Math.floor(diff / 60000);
      seconds = Math.floor((diff % 60000) / 1000);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.timeRecord.textContent = minutes + ":" + seconds;
    }, 1000);
  }

  recordAudio = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    if (stream) {
      this.stream = stream;
      this.recorder = new MediaRecorder(this.stream);

      this.recorder.addEventListener("start", () => {
        console.log("start");
      });

      this.recorder.start();
    }
  };
}
