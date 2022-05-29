import { setLocale, object, string } from "yup";
import keyBy from "lodash/keyBy.js";

setLocale({
  mixed: {
    required: "rss_block.form.errors.url.required",
    notOneOf: "rss_block.form.errors.url.notOneOf",
  },
  string: {
    url: "rss_block.form.errors.url.url",
  },
  // required: "rss_block.form.errors.url.required",
  // url: "rss_block.form.errors.url.url",
});

const schema = (urls) =>
  object().shape({
    url: string().required().url().notOneOf(urls),
  });

export default (formData) => {
  return schema(formData.urls)
    .validate(formData.fields, { abortEarly: false })
    .then(() => {
      return {};
    })
    .catch((e) => {
      return keyBy(e.inner, "path");
    });
};
