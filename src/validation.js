import * as yup from 'yup';
import keyBy from 'lodash/keyBy.js';

const schema = yup.object().shape({
    url: yup.string().url(),
});

export default (fields) => {
    return schema.validate(fields, {abortEarly: false}).then((data) => {
        return {};
    }).catch((e) => {
        return keyBy(e.inner, 'path');
    });
};
