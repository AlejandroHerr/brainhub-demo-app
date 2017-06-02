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
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread'],
        },
      },
      {
        test: {
          test: /\.css$/,
          not: [/style\.css$/],
        },
        use: [
          'style-loader?sourceMap',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ],

      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ADDR: JSON.stringify(process.env.ADDR),
        PORT: JSON.stringify(process.env.PORT),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Brainhub DemoApp',
      filename: 'index.html',
      template: `${path.resolve(__dirname, '../../', 'src', 'client', 'index.html')}`,
    }),

  ],
};
