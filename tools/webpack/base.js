const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../../', 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,

        exclude: [
          path.resolve(__dirname, '../../', 'node_modules'),
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
          plugins: ['transform-react-jsx', 'transform-object-rest-spread'],
        },

      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BACKEND: JSON.stringify(process.env.BACKEND),
        BACKEND_PORT: JSON.stringify(process.env.BACKEND_PORT),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Brainhub DemoApp',
      filename: 'index.html',
      template: `${path.resolve(__dirname, '../../', 'src', 'client', 'index.html')}`,
    }),

  ],
};
