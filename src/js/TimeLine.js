export default class Timeline {
  #element;
  constructor(element) {
    this.#element = element;
    this.postsList = null;
  }

  #innerHtmlTimeLine() {
    return `
        <div class="ruler"></div>
        <ul class="posts"></ul>
        <div class="input-panel">
            <textarea class="input-post" placeholder="Введите текст"></textarea>
            <div class="panel-check">
              <div class="audio-check"></div>
              <div class="video-check"></div>
            </div>
        </div>
    `;
  }

  bindToDom() {
    const timeLineHtml = this.#innerHtmlTimeLine();
    this.#element.insertAdjacentHTML("afterbegin", timeLineHtml);

    this.posts = this.#element.querySelector(".posts");
    this.inputPanel = this.#element.querySelector(".input-panel");
    this.inputPost = this.#element.querySelector(".input-post");
    this.panelCheck = this.#element.querySelector(".panel-check");
    this.audioCheck = this.#element.querySelector(".audio-check");
    this.videoCheck = this.#element.querySelector(".video-check");

    this.addPosts();
  }

  #removePosts() {
    [...this.posts.querySelectorAll(".post")].forEach((el) => el.remove());
  }

  #innerHtmlPost(objectPost) {
    let content = null;
    if (objectPost.text) {
      // eslint-disable-next-line no-const-assign
      content = `<p class="content">${objectPost.text}</p>`;
    }
    const html = `
        <li class="post">
            ${content}
            <div class="time">${objectPost.time}</div>
            <div class="geolocation">[${objectPost.geolocation.latitude}, ${objectPost.geolocation.longitude}]</div>
            <div class="geolocation-icon"></div>
            <div class="ruler-mark"></div>
        </li>
    `;
    return html;
  }

  addPosts() {
    this.#removePosts();
    if (this.postsList.length === 0) return;
    this.postsList.forEach((el) => {
      const postHtml = this.#innerHtmlPost(el);
      this.posts.insertAdjacentHTML("afterbegin", postHtml);
    });
  }

  visiblePanelCheck() {
    this.panelCheck.classList.toggle("invisible");
  }
}
