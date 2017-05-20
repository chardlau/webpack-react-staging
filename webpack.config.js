var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    filename: 'out.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0','react'],
            plugins: [
              ['react-hot-loader/babel'],
              ['import', {"libraryName": "antd", "style": "css"}]
            ]
          }
        }
      },
      //{
      //  test: /\.css$/,
      //  use: ['style-loader', 'css-loader']
      //},
      {
          test: /-m\.css$/,
          use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [
                  {
                      loader: 'css-loader',
                      options: {
                          modules: true,
                          localIdentName: '[path][name]-[local]-[hash:base64:5]'
                      }
                  }
              ]
          })
      },
      {
          test: /^((?!(-m)).)*\.css$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader'
          })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
