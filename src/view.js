import has from "lodash/has.js";

const handleProcessState = (elements, processState) => {
  switch (processState) {
    case "sent":
      console.log("sent");
      // elements.container.innerHTML = 'User Created!';
      break;

    case "error":
      console.log("err");
      // elements.submitButton.disabled = false;
      break;

    case "sending":
      console.log("sending");
      // elements.submitButton.disabled = true;
      break;

    case "filling":
      console.log("fill!");
      // elements.submitButton.disabled = false;
      break;

    default:
      // https://ru.hexlet.io/blog/posts/sovershennyy-kod-defolty-v-svitchah
      throw new Error(`Unknown process state: ${processState}`);
  }
};

const handleProcessError = () => {
  // вывести сообщение о сетевой ошибке
};

const renderErrors = (elements, errors, prevErrors) => {
  const formBlockElement = elements.form.closest("div");
  Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
    const error = errors[fieldName];

    const fieldHadError = has(prevErrors, fieldName);
    const fieldHasError = has(errors, fieldName);
    if (!fieldHadError && !fieldHasError) {
      return;
    }

    if (fieldHadError && !fieldHasError) {
      fieldElement.classList.remove("is-invalid");
      formBlockElement.lastElementChild.remove();
      return;
    }

    if (fieldHadError && fieldHasError) {
      const feedbackElement = formBlockElement.lastElementChild;
      feedbackElement.textContent = error.message;
      return;
    }

    fieldElement.classList.add("is-invalid");
    const feedbackElement = document.createElement("div");
    feedbackElement.classList.add(
      "feedback",
      "m-0",
      "position-absolute",
      "small",
      "text-danger"
    );
    feedbackElement.textContent = error.message;

    // fieldElement.after(feedbackElement);
    formBlockElement.append(feedbackElement);
  });
};

export default (elements) => (path, value, prevValue) => {
  switch (path) {
    case "form.processState":
      handleProcessState(elements, value);
      break;

    case "form.processError":
      handleProcessError();
      break;

    case "form.errors":
      console.log(prevValue);
      renderErrors(elements, value, prevValue);
      break;

    default:
      break;
  }
};
