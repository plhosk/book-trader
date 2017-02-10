// const CodeSplitWebpackPlugin = require('code-split-component/webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // eslint-disable-line

const path = require('path')
const webpack = require('webpack') // eslint-disable-line

// const srcPath = path.join(__dirname, '/app')
const buildPath = path.join(__dirname, '/public')

const config = {
  entry: {
    main: [
      'babel-polyfill',
      './app/App.jsx',
    ],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'redux-saga',
      'history',
      'inline-style-prefixer',
      'lodash.merge',
      'core-js',
      'redbox-react',
    ],
  },
  output: {
    path: buildPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['es2015', { modules: false }], 'stage-0', 'react'],
            // plugins: ['code-split-component/babel'],
          },
        }],
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json-loader',
        }],
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    // new CodeSplitWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'templates/index.ejs',
    }),
  ],
}

module.exports = config
