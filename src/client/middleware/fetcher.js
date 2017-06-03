/* global fetch */
import 'isomorphic-fetch';
import isNil from 'lodash/isNil';

export const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  const err = new Error(`${res.status} - ${res.statusText}`);
  err.res = res;

  throw err;
};

export const configureUri = ({ scheme = 'http', domain = 'localhost', port = '80', route = '' } = {}) => endpoint =>
  `${scheme}://${domain}:${port}/${route ? `${route}/` : ''}${endpoint}`;

export default (isFetcherAction, options = {}) => {
  const endpointUrl = configureUri(options);
  return ({ dispatch }) => next => (action) => {
    const { payload, type, meta } = action;

    if (!isFetcherAction(type)) {
      return next(action);
    }

    // Send the request action through
    next(action);

    const { endpoint, body, method, onSuccess, onFail } = meta;

    const request = { method };

    if (!isNil(body)) {
      request.headers = {
        'Content-Type': 'application/json',
      };
      request.body = JSON.stringify(body);
    }

    return fetch(endpointUrl(endpoint), request)
        .then(checkStatus)
        .then(res => res.json())
        .then(res => dispatch(onSuccess(res, payload)))
        .catch(error => dispatch(onFail(error)));
  };
};
