import { createActions, createAction } from 'redux-actions';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';

export const INIT_FORM = 'INIT_FORM';
export const DESTROY_FORM = 'DESTROY_FORM';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const RESET_FORM = 'RESET_FORM';
export const SUBMIT_FORM_REQUEST = 'SUBMIT_FORM_REQUEST';
export const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
export const SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';

export const { updateField } = createActions({
  [UPDATE_FIELD]: [
    (field, value) => {
      if (isNil(field)) throw new Error('Field cannot be null or undefined');
      if (isNil(value)) throw new Error('Value cannot be null or undefined');

      return { field, value };
    },
    (field, value, validators = []) => ({ value, validators }),
  ],
});

export const { initForm, submitFormSuccess, destroyForm, resetForm, submitFormFail } = createActions({
  [INIT_FORM]: (fields) => {
    if (!isArray(fields)) throw new Error('Fields has to be an array');

    return { fields };
  },
  [SUBMIT_FORM_SUCCESS]: res => res,
}, DESTROY_FORM, RESET_FORM, SUBMIT_FORM_FAIL);

export const submitFormRequest = createAction(
  SUBMIT_FORM_REQUEST,
  data => data,
  (body = null) => ({ endpoint: 'attendant', body, method: 'POST', onFail: submitFormFail, onSuccess: submitFormSuccess }),
);
