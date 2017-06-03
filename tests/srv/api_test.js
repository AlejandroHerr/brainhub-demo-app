import test from 'tape';
import request from 'supertest';
import mongodb from 'mongo-mock';
import has from 'lodash/has';
import isArray from 'lodash/isArray';
import size from 'lodash/size';
import server from '../../src/srv/server';
import * as error from '../../src/srv/error';


test('+ POST /api/attendant', ({ test: subtest }) => {
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
  subtest('|-> Checks request\'s body shouldn\'t have strange keys', (t) => {
    request(server)
    .post('/api/attendant')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ age: 28, name: 'Alejandro', surname: 'Hernandez', email: 'ahernandezc@protonmail.com', date: '2017-06-03' })
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
  subtest('|-> Checks request\'s body shouldn\'t have strange keys', (t) => {
    request(server)
    .post('/api/attendant')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ name: 'Alejandro', surname: 'Hernandez', email: 'ahernandezcprotonmail.com', date: '201706-03' })
    .expect(400)
    .expect((res) => {
      t.equal(res.body.code, 400);
      t.equal(res.body.message, 'Validation error');
      t.ok(has(res.body.meta, 'validation'), ' Should contain a key in meta with validation errors');
      t.ok(isArray(res.body.meta.validation), ' Should contain array of validation errors');
      t.ok(size(res.body.meta.validation) > 0, 'Should contain all validation errors');
    })
    .end((err) => {
      t.error(err);
      t.end();
    });
  });
  subtest('`-> Handles right request', (t) => {
    mongodb.max_delay = 0;
    mongodb.MongoClient.connect(`mongodb://${process.env.MONGO_ADDR}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {}, (err, db) => {
      server.db = db;
      request(server)
        .post('/api/attendant')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ name: 'Alejandro', surname: 'Hernandez', email: 'ahernandezc@protonmail.com', date: '2017-06-03' })
        .expect(201)
        .expect({ message: 'Attendant created.' })
        .expect('Content-Type', /json/)
        .end((err) => {
          t.error(err);
          db.close();
          t.end();
        });
    });
  });
});

test('- ALL /api', (t) => {
  request(server)
    .get('/api')
    .expect(error.notFound.status)
    .expect({ code: error.notFound.status, message: error.notFound.message })
    .end((err) => {
      t.error(err);
      t.end();
    });
});

test('- ALL /api/attendant', (t) => {
  request(server)
    .get('/api/attendant')
    .expect(error.methodNotAllowed.status)
    .expect({ code: error.methodNotAllowed.status, message: error.methodNotAllowed.message })
    .end((err) => {
      t.error(err);
      t.end();
    });
});
