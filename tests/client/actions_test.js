import test from 'tape';
import {
  INIT_FORM,
  initForm,
  UPDATE_FIELD,
  updateField,
  RESET_FORM,
  resetForm,
  SUBMIT_FORM_SUCCESS,
  submitFormSuccess,
  SUBMIT_FORM_REQUEST,
  submitFormRequest,
  SUBMIT_FORM_FAIL,
  submitFormFail } from '../../src/client/actions';

test('+ actions and action creators', ({ test: subtest }) => {
  subtest('|- INIT_FORM', (t) => {
    t.throws(initForm, 'Fields has to be an array', 'Enforces \'Fields\' to be set in payload');
    t.throws(() => initForm('notArray'), 'Fields has to be an array', 'Enforces \'Fields\' to be an Array');

    const action = initForm(['name']);
    t.deepEqual(action, { type: INIT_FORM, payload: { fields: ['name'] } }, 'Sets right payload');

    t.end();
  });
  subtest('|- UPDATE_FIELD', (t) => {
    t.throws(updateField, 'Field cannot be null or undefined', 'Enforces \'Field\' to be set in payload');
    t.throws(() => updateField('field'), 'Value cannot be null or undefined', 'Enforces \'Value\' to be set in payload');

    let action = updateField('name', 'Philip K. Dick');
    t.deepEqual(action, { type: UPDATE_FIELD, payload: { field: 'name', value: 'Philip K. Dick' }, meta: { value: 'Philip K. Dick', validators: [] } }, 'Sets default payload');

    action = updateField('email', 'rick@deckard.com', ['isRequired', 'isEmail']);
    const expected = {
      type: UPDATE_FIELD,
      payload: {
        field: 'email',
        value: 'rick@deckard.com',
      },
      meta: { value: 'rick@deckard.com', validators: ['isRequired', 'isEmail'] },
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
