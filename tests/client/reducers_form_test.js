import test from 'tape';
import merge from 'lodash/merge';
import { initForm, UPDATE_FIELD, submitFormSuccess, resetForm } from '../../src/client/actions';
import reducer from '../../src/client/reducers/form';

const defaultState = { fields: {}, isSubmiting: false, error: false, submited: false };
const defaultFieldState = { value: '', touched: false, valid: false, errors: [] };

const buildState = state => merge({}, defaultState, state);

test('+ Form Reducer', ({ test: subtest }) => {
  subtest('|- Default state', (t) => {
    t.looseEqual(reducer(undefined, { type: 'MOCK' }), defaultState);
    t.end();
  });
  subtest('|- Action: INIT_FORM', (t) => {
    const state = { fields: {}, isSubmiting: false, message: null };
    const action = initForm(['name', 'email']);
    const nextState = reducer(state, action);
    const expectedState = buildState({
      fields: {
        name: defaultFieldState,
        email: defaultFieldState,
      } });
    t.notEqual(nextState,
      state, 'Doesn\'t mutate state');
    t.deepLooseEqual(nextState, expectedState, 'Inits fields with default state');

    t.end();
  });
  subtest('|- Action: UPDATE_FIELD', (t) => {
    let state = {
      fields: { name: defaultFieldState, email: defaultFieldState },
      isSubmiting: false,
      message: null,
    };
    let action = {
      type: UPDATE_FIELD,
      payload: {
        field: 'name',
        value: 'Philip',
        valid: false,
        errors: ['Name can\'t be empty'],
      },
    };
    let expectedState = buildState({
      fields: {
        ...state.fields,
        name: { value: 'Philip', touched: true, valid: false, errors: ['Name can\'t be empty'] },
      } });
    let nextState = reducer(state, action);
    t.notEqual(nextState, state, 'Doesn\'t mutate state');
    t.deepEqual(nextState, expectedState, 'Updates validation errors');

    state = nextState;
    action = {
      type: UPDATE_FIELD,
      payload: {
        field: 'name',
        value: 'Philip K. Dick',
        valid: true,
        errors: [],
      },
    };
    expectedState = buildState({
      fields: {
        ...state.fields,
        name: { value: 'Philip K. Dick', touched: true, valid: true, errors: [] },
      } });
    nextState = reducer(state, action);
    t.notEqual(nextState, state, 'Doesn\'t mutate state');
    t.deepEqual(nextState, expectedState, 'Updates the field');

    t.end();
  });

  subtest('|- Action: SUBMIT_FORM', (t) => {
    const state = buildState({
      fields: {
        name: { value: 'Philip K. Dick', touched: true, valid: true, errors: [] },
        email: { value: 'rick@deckard.com', touched: true, valid: true, errors: [] },
      },
      isSubmiting: true,
    });

    const action = submitFormSuccess();
    const expectedState = buildState({
      fields: {
        name: defaultFieldState,
        email: defaultFieldState,
      },
      submited: true,
    });
    const nextState = reducer(state, action);

    t.notEqual(nextState, state, 'Doesn\'t mutate state');
    t.deepEqual(nextState, expectedState, 'Resets the form');
    t.end();
  });
  subtest('`- Action: RESET_FORM', (t) => {
    const state = buildState({
      fields: {
        name: { value: 'Philip K. Dick', touched: true, valid: true, errors: [] },
        email: { value: 'rick@deckard.com', touched: true, valid: true, errors: [] },
      },
      isSubmiting: false,
      submited: true,
    });
    const action = resetForm();
    const expectedState = buildState({
      fields: {
        name: defaultFieldState,
        email: defaultFieldState,
      },
    });
    const nextState = reducer(state, action);

    t.notEqual(nextState, state, 'Doesn\'t mutate state');
    t.deepEqual(nextState, expectedState, 'Resets the form');
    t.end();
  });
});

// test('', (t) => { t.end(); });
