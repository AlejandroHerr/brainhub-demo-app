import { isEmpty, isNull, isUndefined } from 'lodash';
import * as error from '../error';

export default (req, res, next) => {
  const { body } = req;
  if (isEmpty(body) || isNull(body) || isUndefined(body)) return next(error.badRequest);

  return next();
};
