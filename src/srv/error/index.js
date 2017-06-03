const errorBadRequest = new Error('Bad Request');
errorBadRequest.status = 400;

export const badRequest = errorBadRequest;

const errorNotFound = new Error('Not Found');
errorNotFound.status = 404;

export const notFound = errorNotFound;

const errorMethodNotAllowed = new Error('Method Not Allowed');
errorMethodNotAllowed.status = 405;

export const methodNotAllowed = errorMethodNotAllowed;

const errorNotAcceptable = new Error('Not Acceptable');
errorNotAcceptable.status = 406;

export const notAcceptable = errorNotAcceptable;

const errorUnsupportedMediaType = new Error('Unsupported Media Type');
errorUnsupportedMediaType.status = 415;

export const unsupportedMediaType = errorUnsupportedMediaType;
