import { Router } from 'express';
import { json } from 'body-parser';
import * as error from '../error';
import checkJsonHeaders from '../middleware/checkJsonHeaders';
import hasBody from '../middleware/hasBody';

const router = Router();

router.all('/attendant', (req, res, next) => {
  if (req.method === 'POST') return next();

  return next(error.methodNotAllowed);
});

const jsonParser = json();

router.post('/attendant', checkJsonHeaders, jsonParser, hasBody, (req, res) => {
  res.status(201).json({ message: 'Attendant created.' });
});

router.all('*', (req, res, next) => next(error.notFound));


router.use((err, req, res, next) => res
    .status(err.status)
    .json({ code: err.status, message: err.message }));

export default router;
