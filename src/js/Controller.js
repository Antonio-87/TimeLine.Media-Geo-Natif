import FormGeolocation from "./FormGeolocation";
import Posts from "./Posts";
import Timeline from "./TimeLine";
import { parseCoordinates } from "./parseCoordinates";

export default class Controller {
  #element;
  #timeLine;
  #formGelocation;
  #geolocation;
  constructor(element) {
    this.#element = element;
    this.#timeLine = new Timeline(this.#element);
    this.#timeLine.postsList = Posts.postsList;
    this.#timeLine.bindToDom();
    this.#formGelocation = new FormGeolocation(this.#element);
    this.#formGelocation.bindToDom();
    this.#geolocation = this.#formGelocation.getGeolocation((geo) => geo);

    this.#timeLine.inputPost.addEventListener("keydown", this.onKeydown);
  }

  onKeydown = (e) => {
    const target = e.target;

    if (e.keyCode === 13) {
      if (target.value === "") return;
      if (!e.ctrlKey) {
        e.preventDefault();
        if (this.#geolocation) {
          console.log(this.#geolocation);
          Posts.addPost(this.#timeLine.inputPost.value, this.#geolocation);
          console.log(Posts.postsList);
          this.#timeLine.addPosts();
          target.value = "";
        } else {
          this.#formGelocation.visibleFormGelocation();
        }
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
      const coordinates = parseCoordinates(this.#formGelocation.input.value);
      if (coordinates) {
        Posts.addPost(this.#timeLine.inputPost.value, coordinates);
        this.#timeLine.addPosts();
        this.#formGelocation.invisibleFormGeolocation();
      } else {
        this.#formGelocation.validation.classList.remove("invisible");
        this.#formGelocation.input.value = "";
        return;
      }
      this.#formGelocation.input.value = "";
      this.#timeLine.inputPost.value = "";
    }

    if (target.classList.contains("cancel")) {
      this.#formGelocation.invisibleFormGeolocation();
      this.#formGelocation.input.value = "";
    }
  };
}
