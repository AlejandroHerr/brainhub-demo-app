import { Router } from 'express';
import { json } from 'body-parser';
import * as httpError from '../error';
import checkJsonHeaders from '../middleware/checkJsonHeaders';
import hasBody from '../middleware/hasBody';
import validatorCreator from '../middleware/validator';
import formOptions from '../../common/form';

const router = Router();

router.all('/attendant', (req, res, next) => {
  if (req.method === 'POST') return next();

  return next(httpError.methodNotAllowed);
});

const jsonParser = json();
const validator = validatorCreator(formOptions);

router.post('/attendant', checkJsonHeaders, jsonParser, hasBody, validator, (req, res, next) => {
  const { app: { db }, body } = req;

  db.collection('attendants').insert(body, (err) => {
    if (err) {
      return next(httpError.internalServerError);
    }

    return res.status(201).json({ message: 'Attendant created.' });
  });
});

router.all('*', (req, res, next) => next(httpError.notFound));


router.use((err, req, res, next) => res
    .status(err.status)
    .json({ code: err.status, message: err.message, meta: err.meta }));

export default router;
