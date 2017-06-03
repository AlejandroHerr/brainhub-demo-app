import every from 'lodash/every';
import filter from 'lodash/filter';
import get from 'lodash/get';
import keysIn from 'lodash/keysIn';
import map from 'lodash/map';
import size from 'lodash/size';
import some from 'lodash/some';
import defaultValidator from '../../common/validator';
import { badRequest } from '../error';

/*
  Validates the fields of the form and returns an array
  with the errors in the form { name<string>, valid<bool>, message<string>}
 */
const validate = (data, fields, validator) => {
  const validation = map(fields, (field) => {
    const result = validator(get(data, field.name, null), field.validators);
    return {
      name: field.name,
      ...result,
    };
  });
  return filter(validation, ['valid', false]);
};

const isValid = validation => size(validation) === 0;

export default (formOptions, validator = defaultValidator) => (req, res, next) => {
  const { body } = req;
  const { fields } = formOptions;

  // Checks if there's fields strange to the form
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
