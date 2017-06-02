import noop from 'lodash/noop';

export default () => ({
  dispatch() {
    noop();
  },
  next() {
    noop();
  },
  dispatchAction(action, middleware) {
    middleware({ dispatch: this.dispatch })(this.next)(action);
  },
});
