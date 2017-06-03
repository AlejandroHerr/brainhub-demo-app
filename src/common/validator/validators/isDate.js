import isString from 'lodash/isString';

const DATE_REGEX = /^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/;

const msg = 'Enter a real date';

const test = (value) => {
  if (!isString(value)) return false;

  return DATE_REGEX.test(value);
};

export default { test, msg };
