import concat from 'lodash/concat';
import constant from 'lodash/constant';
import has from 'lodash/has';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import reduce from 'lodash/reduce';
import size from 'lodash/size';
import defaultValidatorsCollection from './validators';

const initValidation = constant({ valid: true, errors: [] });

export const createValidator = (validatorsCollection) => {
  if (!isObject(validatorsCollection)) throw new Error('ValidatorsCollection must be an object');

  return (value, validators) => {
    if (!isArray(validators)) throw new Error('Validators should be an array');
    if (size(validators) === 0) return initValidation();

    return reduce(validators, (validation, validator) => {
      if (!has(validatorsCollection, validator)) throw new Error(`Validator '${validator}' not configured`);

      const { test, msg } = validatorsCollection[validator];

      if (test(value)) return validation;

      return {
        valid: false,
        errors: concat(validation.errors, msg),
      };
    }, initValidation());
  };
};

export default createValidator(defaultValidatorsCollection);
