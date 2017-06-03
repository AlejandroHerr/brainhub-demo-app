import { MongoClient } from 'mongodb';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack';
import server from '../src/srv/server';

const compiler = webpack(config);
server.use(webpackDevMiddleware(compiler, { stats: { colors: true }, noInfo: false, publicPath: '/' }));
server.use(webpackHotMiddleware(compiler));

MongoClient.connect(`mongodb://${process.env.MONGO_ADDR}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, (err, database) => {
  if (err) throw err;

  const db = database;
  server.db = db;
  server.listen(process.env.PORT, process.env.ADDR, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Brainhub demo app listening on port ${process.env.ADDR}:${process.env.PORT}!`);
    }
  });
});
