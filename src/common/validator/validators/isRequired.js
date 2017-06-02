import isString from 'lodash/isString';
import size from 'lodash/size';

const msg = 'Field can\'t be empty';

const test = (value) => {
  if (!isString(value)) return false;

  return (size(value) > 0);
};

export default { test, msg };
