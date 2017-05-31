import test from 'tape';
import request from 'supertest';
import server from '../../src/srv/server';
import * as error from '../../src/srv/error';

test('- Rejects non existent routes for /api', (t) => {
  request(server)
    .get('/api')
    .expect(error.notFound.status)
    .expect({ code: error.notFound.status, message: error.notFound.message })
    .end((err) => {
      t.error(err);
      t.end();
    });
});

test('- Rejects invalid methods for /api/attendant', (t) => {
  request(server)
    .get('/api/attendant')
    .expect(error.methodNotAllowed.status)
    .expect({ code: error.methodNotAllowed.status, message: error.methodNotAllowed.message })
    .end((err) => {
      t.error(err);
      t.end();
    });
});

test('+ Handles POST /api/attendant route', ({ test: subtest }) => {
  subtest('|-> Checks right Accept headers', (t) => {
    request(server)
    .post('/api/attendant')
    .set('Accept', 'application/xml')
    .expect(error.notAcceptable.status)
    .expect({ code: error.notAcceptable.status, message: error.notAcceptable.message })
    .end((err) => {
      t.error(err);
      t.end();
    });
  });
  subtest('|-> Checks right Accept headers', (t) => {
    request(server)
    .post('/api/attendant')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/xml')
    .expect(error.unsupportedMediaType.status)
    .expect({
      code: error.unsupportedMediaType.status,
      message: error.unsupportedMediaType.message,
    })
    .end((err) => {
      t.error(err);
      t.end();
    });
  });
  subtest('|-> Checks request has a body', (t) => {
    request(server)
    .post('/api/attendant')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(error.badRequest.status)
    .expect({
      code: error.badRequest.status,
      message: error.badRequest.message,
    })
    .end((err) => {
      t.error(err);
      t.end();
    });
  });
  subtest('`-> Handles right request', (t) => {
    request(server)
    .post('/api/attendant')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ name: 'Alejandro' })
    .expect(201)
    .expect({ message: 'Attendant created.' })
    .expect('Content-Type', /json/)
    .end((err) => {
      t.error(err);
      t.end();
    });
  });
});
