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
      'isomorphic-fetch',
      './app/App.jsx',
    ],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router-dom',
      'redux-saga',
      // 'material-ui', // makes vendor file too large...
    ],
  },
  output: {
    path: buildPath,
    filename: 'bundle.[name].[chunkhash].js',
    chunkFilename: 'bundle.[chunkhash].js',
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
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor', 'manifest'],
    //   chunks: ['vendor', 'manifest'],
    //   minChunks: Infinity,
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new CodeSplitWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'templates/index.ejs',
    }),
  ],
}

module.exports = config
