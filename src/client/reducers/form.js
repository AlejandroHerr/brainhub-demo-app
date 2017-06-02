import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import size from 'lodash/size';
import {
  INIT_FORM,
  UPDATE_FIELD,
  RESET_FORM,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_FAIL,
  SUBMIT_FORM_SUCCESS } from '../actions';

const defaultState = { fields: {}, isSubmiting: false, error: false, submited: false };
const defaultField = { value: '', touched: false, valid: false, errors: [] };

const initForm = (state, { payload: { fields } }) => {
  const defaultFields = reduce(fields, (r, field) => set(r, field, defaultField), {});

  return { ...state, fields: defaultFields };
};
const updateField = ({ fields }, { payload }) => {
  const { field, value, valid, errors } = payload;
  return {
    ...defaultState,
    fields: {
      ...fields,
      [field]: { value, touched: true, valid, errors },
    },
  };
};

const resetForm = ({ fields }) => {
  const defaultFields = reduce(fields, (rFields, val, field) => set(rFields, field, defaultField), {});

  return {
    ...defaultState,
    fields: defaultFields,
  };
};
const submitForm = state => ({ ...state, isSubmiting: true, error: false, submited: false });
const submitFormFail = state => ({ ...state, isSubmiting: false, error: true, submited: false });
const submitFormSuccess = state => set(resetForm(state), 'submited', true);

export default handleActions({
  [INIT_FORM]: initForm,
  [UPDATE_FIELD]: updateField,
  [SUBMIT_FORM_REQUEST]: submitForm,
  [SUBMIT_FORM_FAIL]: submitFormFail,
  [SUBMIT_FORM_SUCCESS]: submitFormSuccess,
  [RESET_FORM]: resetForm,
}, defaultState);


export const selectFields = state => state.form.fields;
export const selectIsValid = createSelector(
  selectFields,
  ({ form }) => form.isSubmiting,
  ({ form }) => form.error,
  ({ form }) => form.submited,
  (fields, isSubmiting, error, submited) => {
    if (isSubmiting || submited || error || size(fields) === 0) return false;

    return reduce(fields, (isValid, field) => isValid && field.touched && field.valid, true);
  });
