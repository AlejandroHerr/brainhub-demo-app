import test from 'tape';
import {
  INIT_FIELD,
  initField,
  UPDATE_FIELD,
  updateField,
  RESET_FORM,
  resetForm,
  SUBMIT_FORM_SUCCESS,
  submitFormSuccess } from '../../src/client/actions';

test('+ actions and action creators', ({ test: subtest }) => {
  subtest('|- INIT_FIELD', (t) => {
    t.throws(initField, 'Field cannot be null or undefined', 'Enforces \'Field\' to be in payload');

    const action = initField('name');
    t.deepEqual(action, { type: INIT_FIELD, payload: { field: 'name' } }, 'Sets right payload');

    t.end();
  });
  subtest('|- UPDATE_FIELD', (t) => {
    t.throws(updateField, 'Field cannot be null or undefined', 'Enforces \'Field\' to be in payload');
    t.throws(() => updateField('field'), 'Value cannot be null or undefined', 'Enforces \'Value\' to be in payload');

    let action = updateField('name', 'Philip K. Dick');
    t.deepEqual(action, { type: UPDATE_FIELD, payload: { field: 'name', value: 'Philip K. Dick' }, meta: { validators: [] } }, 'Sets default payload');

    action = updateField('email', 'rick@deckard.com', ['isRequired', 'isEmail']);
    const expected = {
      type: UPDATE_FIELD,
      payload: {
        field: 'email',
        value: 'rick@deckard.com',
      },
      meta: { validators: ['isRequired', 'isEmail'] },
    };

    t.deepEqual(action, expected, 'Sets right payload');

    t.end();
  });
  subtest('|- RESET_FORM', (t) => {
    const action = resetForm();
    t.deepEqual(action, { type: RESET_FORM }, 'Creates actions with only type');

    t.end();
  });
  subtest('`- SUBMIT_FORM_SUCCESS', (t) => {
    const action = submitFormSuccess({ message: 'Attendant created' });
    t.deepEqual(action, { type: SUBMIT_FORM_SUCCESS, payload: { message: 'Attendant created' } }, 'Sets default payload');

    t.end();
  });
});
