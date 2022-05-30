import onChange from "on-change";
import render from "./view.js";
import validate from "./validation.js";
import isEmpty from "lodash/isEmpty.js";
import i18n from "i18next";
import resources from "./locales/index.js";

const languages = ["en", "ru"];

export default (initialState) => {
    // console.log(i18nInstance.t("languages.ru"));
    const elements = {
        form: document.querySelector(".rss-form"),
        fields: {
            url: document.querySelector("#url-input"),
        },
    };

    const defaultLanguage = 'ru';
    const i18nInstance = i18n.createInstance();

    const state = {
        lng: defaultLanguage,
        form: {
            valid: true,
            fields: {
                url: "",
            },
            processState: "filling",
            processError: null,
            urls: [],
        },
        ...initialState
    };
    
    i18nInstance.init({
        lng: state.lng,
        debug: false,
        resources,
    });

    onChange(state, render(elements, i18nInstance));
    
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
