import { combineReducers } from 'redux';

const rootReducer = combineReducers({ test: (state = { h: 'hs' }) => state });

export default rootReducer;
