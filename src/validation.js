import * as yup from "yup";
import keyBy from "lodash/keyBy.js";

const schema = (urls) =>
  yup.object().shape({
    url: yup.string().required().url().notOneOf(urls),
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
