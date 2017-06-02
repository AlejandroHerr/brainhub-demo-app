import test from 'blue-tape';
import { spy } from 'sinon';
import fetchMock from 'fetch-mock';
import { createAction, createActions } from 'redux-actions';
import configureFetcher from '../../src/client/middleware/fetcher';
import createMockStore from '../../src/common/mock/store';

const before = ({ pass, end }) => {
  pass('Configuring fetchMock');
  fetchMock
    .get('http://localhost:80/success', { title: 'Hello World' })
    .get('http://localhost:80/success2', { title: 'Hello World2' })
    .get('http://localhost:80/fail', 400)
    .catch(400);
  end();
};

const after = ({ pass, end }) => {
  pass('Restoring fetchMock');
  fetchMock.restore();
  end();
};

const setup = () => {
  const mockAction = createAction('MOCK_ACTION');
  const store = createMockStore();
  const dispatchSpy = spy(store, 'dispatch');
  const nextSpy = spy(store, 'next');
  const fetcher = configureFetcher(type => /FETCH_REQUEST$/.test(type));

  return { store, dispatchSpy, nextSpy, fetcher, mockAction };
};


const setupAsync = () => {
  const { fetchSuccess, fetchError } = createActions({
    FETCH_SUCCESS: (res, payload) => ({ res, ...payload }),
  }, 'FETCH_ERROR');
  const fetchRequest = createAction(
    'FETCH_REQUEST',
    endpoint => ({ endpoint }),
    endpoint => ({ endpoint, method: 'GET', onFail: fetchError, onSuccess: fetchSuccess }),
  );

  const store = createMockStore();
  const dispatchSpy = spy(store, 'dispatch');
  const nextSpy = spy(store, 'next');
  const fetcher = configureFetcher(type => /FETCH_REQUEST$/.test(type));

  return { store, dispatchSpy, nextSpy, fetcher, fetchSuccess, fetchError, fetchRequest };
};

const nonFetchAction = (t) => {
  const { store, dispatchSpy, nextSpy, fetcher, mockAction } = setup();
  const action = mockAction();

  store.dispatchAction(action, fetcher);

  t.ok(nextSpy.calledOnce, 'Should call next() for non fetch actions');
  t.ok(nextSpy.calledWith(action), 'Should call next() with non fetch action');
  t.notOk(dispatchSpy.calledOnce, 'Should not call dispatch() for non fetch actions');

  t.end();
};

const successTest = (t) => {
  const { store, dispatchSpy, nextSpy, fetcher, fetchSuccess, fetchRequest } = setupAsync();
  const action = fetchRequest('success');
  const expected = fetchSuccess({ title: 'Hello World' }, { endpoint: 'success' });

  return store.dispatchAction(action, fetcher).then(() => {
    t.ok(nextSpy.calledOnce, 'Should call next() for the request action');
    t.ok(nextSpy.calledWith(action), 'Should call next() with the request action');
    t.ok(dispatchSpy.calledOnce, 'Should call dispatch() with succes or error action');
    t.deepEqual(dispatchSpy.getCall(0).args[0], expected, 'Should call dispatch with success action');
  });
};

const failTest = (t) => {
  const { store, dispatchSpy, nextSpy, fetcher, fetchError, fetchRequest } = setupAsync();
  const action = fetchRequest('fail');
  const expected = fetchError(new Error('400 - Bad Request'));

  return store.dispatchAction(action, fetcher).then(() => {
    t.ok(nextSpy.calledOnce, 'Should call next() for the request action');
    t.ok(nextSpy.calledWith(action), 'Should call next() with the request action');
    t.ok(dispatchSpy.calledOnce, 'Should call dispatch() with succes or error action');
    const dispatchedAction = dispatchSpy.getCall(0).args[0];
    t.equal(dispatchedAction.type, expected.type, 'Should dispatch error type action');
    t.ok(dispatchedAction.error, 'Should disptach error action');
    t.looseEqual(dispatchedAction.payload.message, expected.payload.message, 'Should dispatch with the status errro as payload');
  });
};

test('middlewares > fetcher', ({ test: subtest }) => {
  subtest('|- Non fetch action', nonFetchAction);
  subtest('|- Before', before);
  subtest('|- Success Test', successTest);
  subtest('|-Fail Test', failTest);
  subtest('`- After', after);
});
