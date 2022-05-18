import has from 'lodash/has.js';

const handleProcessState = (elements, processState) => {
    switch (processState) {
        case 'sent':
            elements.container.innerHTML = 'User Created!';
            break;

        case 'error':
            elements.submitButton.disabled = false;
            break;

        case 'sending':
            elements.submitButton.disabled = true;
            break;

        case 'filling':
            elements.submitButton.disabled = false;
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
    Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
        const error = errors[fieldName];
        // правильный путь - проверять модель, а не DOM. Модель - единый источник правды.
        const fieldHadError = has(prevErrors, fieldName);
        const fieldHasError = has(errors, fieldName);
        if (!fieldHadError && !fieldHasError) {
            return;
        }

        if (fieldHadError && !fieldHasError) {
            fieldElement.classList.remove('is-invalid');
            fieldElement.nextElementSibling.remove();
            return;
        }

        if (fieldHadError && fieldHasError) {
            const feedbackElement = fieldElement.nextElementSibling;
            feedbackElement.textContent = error.message;
            return;
        }

        fieldElement.classList.add('is-invalid');
        const feedbackElement = document.createElement('div');
        feedbackElement.classList.add('invalid-feedback');
        feedbackElement.textContent = error.message;
        fieldElement.after(feedbackElement);
    });
};

export default (elements) => (path, value, prevValue) => {
    switch (path) {
        case 'form.processState':
            handleProcessState(elements, value);
            break;

        case 'form.processError':
            handleProcessError();
            break;

        case 'form.valid':
            console.log('valid disable!')
            // elements.submitButton.disabled = !value;
            break;

        case 'form.errors':
            renderErrors(elements, value, prevValue);
            break;

        default:
            break;
    }
};
