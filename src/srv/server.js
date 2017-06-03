import express from 'express';
import api from './router/api';

const server = express();

server.use('/api', api);
server.use(express.static('public'));

if (process.env.NODE_ENV !== 'development') {
  server.get('*', (req, res) => {
    res.sendFile('index.html', { root: `${__dirname}/../../public/` });
  });
}

export default server;
