import has from 'lodash/has';
import merge from 'lodash/merge';
import isFunction from 'lodash/isFunction';
import defaultValidator from '../../common/validator';

export const createValidatorMiddleware = (validator, key = 'validators') => {
  if (!isFunction(validator)) throw new Error('Validator middleware should be created with a validator function');

  return () => next => (action) => {
    if (!has(action, `meta.${key}`)) return next(action);

    if (!has(action, 'meta.value')) throw new Error('Validator meta should contain the value to validate');

    const { value, [key]: validators } = action.meta;

    const validation = validator(value, validators);

    return next(merge({}, action, { payload: { ...validation } }));
  };
};

export default createValidatorMiddleware(defaultValidator);
