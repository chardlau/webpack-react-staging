var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main:[
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/index.js'
    ]
  },
  output: {
    filename: '[name].js',
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
          // TODO 对其他第三方依赖也要在这里进行代码分割
          return module.context && module.context.indexOf('jquery') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ]
};
