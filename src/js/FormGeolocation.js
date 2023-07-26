export default class FormGeolocation {
  #element;
  constructor(element) {
    this.#element = element;
  }

  #innerFormGelocation() {
    return `
        <form class="form-geolocation invisible">
            <label for="input-geolocation">
                <p class="text-form">
                    Что-то пошло не так!<br><br>
                    К сожалению нам не удалось определить ваше местопложение.
                    Пожалуйста, дайте разрешение на испльзование геолокации,
                    либо введите координаты вручную.<br><br>
                    Широта и долгота через запятую
                </p>
            </label>
            <input type="text" class="input-geolocation" id="input-geolocation">
            <div class="control-form">
                <div class="ok">Ок</div>
                <div class="cancel">Отмена</div>
            </div>
        </form>
    `;
  }

  bindToDom() {
    const formHtml = this.#innerFormGelocation();
    this.#element.insertAdjacentHTML("beforeend", formHtml);

    this.form = this.#element.querySelector(".form-geolocation");
    this.input = this.#element.querySelector(".input-geolocation");
    this.ok = this.#element.querySelector(".ok");
    this.cancel = this.#element.querySelector(".cancel");

    this.input.addEventlistener("click", this.onClick);
  }

  getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (data) {
          const { latitude, longitude } = data.coords;
          console.log("lat " + latitude);
          console.log("long " + longitude);
          return {
            latitude: latitude,
            longitude: longitude,
          };
        },
        function (err) {
          console.log(err);
          return null;
        },
        { enableHighAccuracy: true }
      );
    }
  }

  visibleFormGelocation() {
    this.form.classlist.remove("invisible");
  }

  invisibleFormGeolocation() {
    this.form.classlist.add("invisible");
  }

  onClick = (e) => {
    e.preventdefault();
    const target = e.target;
    if (target.classlist.contains("ok")) {
    }

    if (target.classlist.contains("cancel")) {
    }
  };
}
