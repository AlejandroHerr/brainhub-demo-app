import test from 'tape';
import { spy } from 'sinon';
import constant from 'lodash/constant';
import noop from 'lodash/noop';
import { createValidatorMiddleware } from '../../src/client/middleware/validator';

test('+ middleware > validator', ({ test: subtest, throws, end }) => {
  throws(createValidatorMiddleware, 'Validator middleware should be created with a validator function');

  const mockValidator = constant({ valid: false, errors: [] });
  const store = {
    dispatch() {
      noop();
    },
    next() {
      noop();
    },
    dispatchAction(action, middleware) {
      middleware({ dispatch: this.dispatch })(this.next)(action);
    },
  };

  const validatorSpy = spy(mockValidator);
  const dispatchSpy = spy(store, 'dispatch');
  const nextSpy = spy(store, 'next');
  const validatorMiddleware = createValidatorMiddleware(validatorSpy);

  subtest('|- Pass through actions without meta validators', (t) => {
    const action = { type: 'ACTION' };
    store.dispatchAction(action, validatorMiddleware);
    t.ok(nextSpy.called, 'Should call next');
    t.ok(nextSpy.calledWith(action), 'Should call next with input action');
    t.notOk(dispatchSpy.called, 'Should not call dispatch');

    t.end();
  });

  subtest('`- Validates actions with meta validators', (t) => {
    const wrongAction = { type: 'ACTION', meta: { validators: [] } };
    t.throws(() => store.dispatchAction(wrongAction, validatorMiddleware), 'Validator meta should contain the value to validate');

    const action = { type: 'ACTION', payload: { value: 'Lovecraft', field: 'name' }, meta: { value: 'Lovercraft 2', validators: [] } };
    store.dispatchAction(action, validatorMiddleware);
    t.ok(validatorSpy.called, 'Should call the validator');
    t.ok(validatorSpy.calledWith(action.meta.value, action.meta.validators), 'Should called validator with the meta values');
    t.ok(nextSpy.called, 'Should call next');
    t.ok(nextSpy.calledWith({ ...action, payload: { ...action.payload, valid: false, errors: [] } }), 'Should call next with input action');
    t.notOk(dispatchSpy.called, 'Should not call dispatch');

    t.end();
  });

  end();
});
