import * as yup from 'yup';

const schema = yup.object().shape({
    url: string().url(),
});

export default (fields) => {
    try {
        schema.validate(fields, { abortEarly: false });
        return {};
    } catch (e) {
        return keyBy(e.inner, 'path');
    }
};
