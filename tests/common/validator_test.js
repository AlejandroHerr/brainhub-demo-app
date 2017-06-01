import test from 'tape';
import { spy } from 'sinon';
import constant from 'lodash/constant';
import { createValidator } from '../../src/common/validator';

test('+ common > validator', ({ deepEqual, end, test: subtest, throws }) => {
  throws(createValidator,
    'ValidatorsCollection must be an object',
    'createValidator should enforce that validatorsCollection is an object');

  const falseVal = spy(constant(false));
  const trueVal = spy(constant(true));
  const validatorsCollection = { trueVal: { test: trueVal, msg: 'Always true' }, falseVal: { test: falseVal, msg: 'Invalid' } };
  const validator = createValidator(validatorsCollection);

  throws(() => validator('value', 'validators'), 'Validators should be an array', 'createValidator should enforce that validators is an array');
  deepEqual(validator('value', []), { valid: true, errors: [] }, 'If there\'s no validation required returns valid');

  subtest('|- Validation with invalid string', (t) => {
    falseVal.reset();
    trueVal.reset();
    const testString = 'String';
    const validation = validator(testString, ['trueVal', 'falseVal', 'falseVal']);

    t.ok(trueVal.called, 'First validator should\'ve been called');
    t.ok(trueVal.calledWith(testString), 'First validator should\'ve been called with the \'testString\'');
    t.ok(falseVal.calledTwice, 'Second validator should\'ve been called');
    t.ok(falseVal.calledWith(testString), 'Second validator should\'ve been called with the \'testString\'');
    t.notOk(validation.valid, 'Validator should return invalid');
    t.deepEqual(validation.errors, ['Invalid', 'Invalid'], 'Validator should return validation errors');
    t.end();
  });

  subtest('`- Validation with valid string', (t) => {
    falseVal.reset();
    trueVal.reset();
    const testString = 'String';
    const validation = validator(testString, ['trueVal', 'trueVal']);

    t.ok(trueVal.calledTwice, 'First validator should\'ve been called');
    t.ok(trueVal.calledWith(testString), 'First validator should\'ve been called with the \'testString\'');
    t.ok(validation.valid, 'Validator should return valid');
    t.deepEqual(validation.errors, [], 'Validator should return no error');
    t.end();
  });

  end();
});
