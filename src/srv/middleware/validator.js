import every from 'lodash/every';
import filter from 'lodash/filter';
import find from 'lodash/find';
import get from 'lodash/get';
import keysIn from 'lodash/keysIn';
import mapValues from 'lodash/mapValues';
import size from 'lodash/size';
import some from 'lodash/some';
import defaultValidator from '../../common/validator';
import { badRequest } from '../error';

const validate = (data, fields, validator) => {
  const validation = mapValues(data, (value, field) => {
    const validators = get(find(fields, ['name', field]), 'validators', []);
    return validator(value, validators);
  });
  return filter(validation, ['valid', false]);
};
const isValid = validation => size(validation) === 0;

export default (formOptions, validator = defaultValidator) => (req, res, next) => {
  const { body } = req;
  const { fields } = formOptions;

  if (!every(keysIn(body), field => some(fields, ['name', field]))) {
    return next(badRequest);
  }

  const validation = validate(body, fields, validator);

  if (!isValid(validation)) {
    const error = new Error('Validation error');
    error.status = 400;
    error.meta = { validation };

    return next(error);
  }

  return next();
};
