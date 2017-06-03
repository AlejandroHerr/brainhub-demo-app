import express from 'express';
import helmet from 'helmet';
import api from './router/api';

const server = express();

server.use(helmet());
server.use('/api', api);

if (process.env.NODE_ENV !== 'development') {
  server.use(express.static('public'));
  server.get('*', (req, res) => {
    res.sendFile('index.html', { root: `${__dirname}/../../public/` });
  });
}

export default server;
