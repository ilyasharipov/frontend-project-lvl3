import { setLocale, object, string } from "yup";
import keyBy from "lodash/keyBy.js";

setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: "field_invalid",
  },
  // use functions to generate an error object that includes the value from the schema
  number: {
    min: ({ min }) => ({ key: "field_too_short", values: { min } }),
    max: ({ max }) => ({ key: "field_too_big", values: { max } }),
  },
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
