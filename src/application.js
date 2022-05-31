import onChange from "on-change";
import {renderErrors} from "./view.js";
import render from "./view.js";
import validate from "./validation.js";
import isEmpty from "lodash/isEmpty.js";
import i18n from "i18next";
import resources from "./locales/index.js";
import has from "lodash/has";

const languages = ["en", "ru"];

export default (initialState) => {
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
            fields: {
                url: "",
            },
            processState: "filling",
            errors: null,
        },
        urls: [],
        ...initialState
    };

    i18nInstance.init({
        lng: state.lng,
        debug: false,
        resources,
    });

    const watchedState = onChange(state, (path, value, prevValue) => {
        console.log(path)
        switch (path) {
            case 'lng':
                i18nInstance.changeLanguage(value).then(() => render(elements, watchedState, i18nInstance));
                break;

            case 'form.processState':
                render(elements, watchedState, i18nInstance);
                break;

            case "form.errors":
                renderErrors(elements, value, prevValue, i18nInstance);
                break;

            default:
                break;
        }
    });

    elements.form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const urlInputValue = formData.get("url");

        watchedState.form.fields.url = urlInputValue;
        watchedState.form.processState = "filling";

        validate(watchedState)
            .then((errors) => {
                watchedState.form.errors = errors;
                // state.form.valid = isEmpty(errors);
            })
            .then(() => {
                // if (!state.form.valid) {
                //     console.log("not true");
                //     return;
                // }

                watchedState.urls.push(urlInputValue);
            }).catch(() => {

        });
    });
};
