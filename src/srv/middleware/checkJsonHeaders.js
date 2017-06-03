import * as error from '../error';

export default (req, res, next) => {
  if (!req.accepts('json')) return next(error.notAcceptable);
  if (!req.is('json')) return next(error.unsupportedMediaType);

  return next();
};
