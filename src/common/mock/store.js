import noop from 'lodash/noop';

export default () => ({
  dispatch() {
    noop();
  },
  next() {
    noop();
  },
  dispatchAction(action, middleware) {
    return middleware({ dispatch: this.dispatch })(this.next)(action);
  },
});
