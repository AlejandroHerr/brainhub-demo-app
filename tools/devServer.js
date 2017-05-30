import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack';
import server from '../src/srv/server';

const compiler = webpack(config);
server.use(webpackDevMiddleware(compiler, { stats: { colors: true }, noInfo: false, publicPath: '/' }));
server.use(webpackHotMiddleware(compiler));

server.listen(process.env.PORT, process.env.ADDR, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Brainhub demo app listening on port ${process.env.ADDR}:${process.env.PORT}!`);
  }
});
