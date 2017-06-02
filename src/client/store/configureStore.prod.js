import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import validator from '../middleware/validator';
import rootReducer from '../reducers';
import fetcher from './configureFetcher';

export default preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, validator, fetcher),
    ),
  );

