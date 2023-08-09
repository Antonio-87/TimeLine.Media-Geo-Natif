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
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        this.popap.remove();
        this.stream = stream;
        this.recorder = new MediaRecorder(this.stream);

        this.recorder.addEventListener("start", () => {
          console.log("start");
        });

        this.recorder.start();
        this.stopwatch();
      })
      .catch((error) => {
        console.log("Ошибка:" + error.message);
        this.messageNotStrim();
      });
  };
  messageNotStrim() {
    const popap = document.createElement("div");
    popap.textContent = "API недоступно, либо пользователь не выдал прав!";
    popap.style.cssText = `
      font-family:'Arial', sans-serif;
      font-size: 25px;
      color: gray;
      position: absolute;
      width: 40%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 2%;
      border: 1.5px solid rgb(62, 57, 57);
      border-radius: 15px;
      background-color: white;
      z-index: 1000;
    `;
    document.body.appendChild(popap);
    this.popap = popap;
  }
}
