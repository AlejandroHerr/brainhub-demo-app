import test from 'tape';
import constant from 'lodash/constant';
import isEmail from '../../src/common/validator/validators/isEmail';
import isRequired from '../../src/common/validator/validators/isRequired';


test('+ common > validator > validators', ({ test: subtest }) => {
  subtest('|- isRequired validator', (t) => {
    t.notOk(isRequired.test(constant(null)), 'Should not validate functions');
    t.notOk(isRequired.test({}), 'Should not validate objects');
    t.notOk(isRequired.test(3), 'Should not validate integers');
    t.notOk(isRequired.test(''), 'Should not validate empty strings');
    t.ok(isRequired.test('A'), 'Should validate non-empty strings');

    t.end();
  });
  subtest('`- isEmail validator', (t) => {
    t.notOk(isEmail.test(constant(null)), 'Should not validate functions');
    t.notOk(isEmail.test({}), 'Should not validate objects');
    t.notOk(isEmail.test(3), 'Should not validate integers');
    t.notOk(isEmail.test('email'), 'Should not validate plain strings');
    t.notOk(isEmail.test('email@domain'), 'Should not validate incomplete emails');
    t.ok(isEmail.test('email@domain.com'), 'Should validate emails');

    t.end();
  });
});
