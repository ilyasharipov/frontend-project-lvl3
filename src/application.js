import onChange from "on-change";
import render from "./view.js";
import validate from "./validation.js";
import isEmpty from "lodash/isEmpty.js";

export default () => {
  const elements = {
    form: document.querySelector(".rss-form"),
    fields: {
      url: document.querySelector("#url-input"),
    },
  };

  const state = onChange(
    {
      form: {
        valid: true,
        fields: {
          url: "",
        },
        processState: "filling",
        processError: null,
        urls: [],
      },
    },
    render(elements)
  );

  elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const urlInputValue = formData.get("url");
    console.log(urlInputValue);
    state.form.fields.url = urlInputValue;
    validate(state.form)
      .then((errors) => {
        state.form.errors = errors;
        state.form.valid = isEmpty(errors);
      })
      .then(() => {
        if (!state.form.valid) {
          console.log("not true");
          return;
        }

        state.form.urls.push(urlInputValue);
        state.form.processState = "sending";
        state.form.processError = null;

        // try {
        //     const data = {
        //         name: state.form.fields.name,
        //         email: state.form.fields.email,
        //         password: state.form.fields.password,
        //     };
        //     await axios.post(routes.usersPath(), data);
        //     state.form.processState = 'sent';
        // } catch (err) {
        //     // в реальных приложениях необходимо помнить об обработке ошибок сети
        //     state.form.processState = 'error';
        //     state.form.processError = errorMessages.network.error;
        //     throw err;
        // }
      });
  });
};
