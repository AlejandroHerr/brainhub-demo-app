import isString from 'lodash/isString';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const msg = 'Must be a real e-mail';

const test = (value) => {
  if (!isString(value)) return false;

  return EMAIL_REGEX.test(value);
};

export default { test, msg };
