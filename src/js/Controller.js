import FormGeolocation from "./FormGeolocation";
import Posts from "./Posts";
import Timeline from "./TimeLine";
import { formatDate } from "./formatDate";

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
    this.#geolocation = this.#formGelocation.getGeolocation();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const target = e.target;

    if (!this.#geolocation) {
      this.#formGelocation.visibleFormGelocation();
    }

    if (target === this.#timeLine.inputPost && this.#geolocation) {
      const time = formatDate(Date.now());
      Posts.postsList.push({
        content: this.inputPost.value,
        time: time,
        geolocation: this.#geolocation,
      });
      console.log(Posts.postsList);
    }
  };
}
