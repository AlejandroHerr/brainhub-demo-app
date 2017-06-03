import test from 'tape';
import constant from 'lodash/constant';
import isDate from '../../src/common/validator/validators/isDate';
import isEmail from '../../src/common/validator/validators/isEmail';
import isRequired from '../../src/common/validator/validators/isRequired';


test('+ common > validator > validators', ({ test: subtest }) => {
  subtest('|- isDate validator', (t) => {
    t.notOk(isDate.test(constant(null)), 'Should not validate functions');
    t.notOk(isDate.test({}), 'Should not validate objects');
    t.notOk(isDate.test(3), 'Should not validate integers');
    t.notOk(isDate.test('21-10-1988'), 'Should not validate wrong formated strings');
    t.notOk(isDate.test('1988/10/21'), 'Should not validate wrong formated strings');
    t.notOk(isDate.test('1988-2110'), 'Should not validate wrong formated strings');
    t.ok(isDate.test('1988-10-21'), 'Should validate valid dates');

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
  subtest('`- isRequired validator', (t) => {
    t.notOk(isRequired.test(constant(null)), 'Should not validate functions');
    t.notOk(isRequired.test({}), 'Should not validate objects');
    t.notOk(isRequired.test(3), 'Should not validate integers');
    t.notOk(isRequired.test(''), 'Should not validate empty strings');
    t.ok(isRequired.test('A'), 'Should validate non-empty strings');

    t.end();
  });
});
