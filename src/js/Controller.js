import Audio from "./Audio";
import FormGeolocation from "./FormGeolocation";
import Posts from "./Posts";
import Timeline from "./TimeLine";
import { parseCoordinates } from "./parseCoordinates";

export default class Controller {
  #element;
  #timeLine;
  #formGeolocation;
  #audio;
  constructor(element) {
    this.#element = element;
    this.#timeLine = new Timeline(this.#element);
    this.#timeLine.postsList = Posts.postsList;
    this.#timeLine.bindToDom();
    this.#formGeolocation = new FormGeolocation(this.#element);
    this.#formGeolocation.bindToDom();
    this.#audio = new Audio(this.#timeLine.inputPanel);
    this.#audio.bindToDom();

    this.#timeLine.inputPost.addEventListener("keydown", this.onKeydown);
  }

  onKeydown = (e) => {
    const target = e.target;
    if (e.keyCode === 13) {
      if (target.value === "") return;
      if (!e.ctrlKey) {
        e.preventDefault();
        this.#formGeolocation.getGeolocation((position) => {
          if (position) {
            console.log(position);
            Posts.addPost(this.#timeLine.inputPost.value, position);
            console.log(Posts.postsList);
            this.#timeLine.addPosts();
            target.value = "";
          } else {
            this.#formGeolocation.visibleFormGelocation();
          }
        });
      } else {
        e.preventDefault();
        const start = target.selectionStart;
        const end = target.selectionEnd;
        target.value =
          target.value.substring(0, start) + "\n" + target.value.substring(end);
        target.selectionStart = target.selectionEnd = start + 1;
      }
    }
  };

  onClick = (e) => {
    const target = e.target;

    if (target.classList.contains("ok")) {
      const coordinates = parseCoordinates(this.#formGeolocation.input.value);
      if (coordinates) {
        Posts.addPost(this.#timeLine.inputPost.value, coordinates);
        this.#timeLine.addPosts();
        this.#formGeolocation.invisibleFormGeolocation();
      } else {
        this.#formGeolocation.validation.classList.remove("invisible");
        this.#formGeolocation.input.value = "";
        return;
      }
      this.#formGeolocation.input.value = "";
      this.#timeLine.inputPost.value = "";
    }

    if (target.classList.contains("cancel")) {
      this.#formGeolocation.invisibleFormGeolocation();
      this.#formGeolocation.input.value = "";
    }

    if (target.classList.contains("audio-check")) {
      this.#timeLine.visiblePanelCheck();
      this.#audio.visiblePanelRecord();
    }

    if (target.classList.contains("stop")) {
      this.#timeLine.visiblePanelCheck();
      this.#audio.visiblePanelRecord();
    }
  };
}
