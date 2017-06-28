const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('../index.js');

module.exports = {
    context: config.rootPath,
    entry: {
        main: [
            './src/index.js'
        ]
    },
    output: {
        filename: '[name].[hash:8].js',
        chunkFilename: 'chunk.[id].[hash:8].js',
        path: config.staticPath,
        publicPath: config.publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0', 'react'],
                        plugins: [
                            ['react-hot-loader/babel'],
                            ['import', {"libraryName": "antd", "style": "css"}]
                        ]
                    }
                }
            },
            {
                // 当前项目，启用CSS modules
                test: /\.less$/,
                include: [config.srcPath],
                exclude: [config.libPath],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 3,
                                localIdentName: '[name]-[local]-[hash:base64:5]'
                            }
                        },
                        {
                            loader: path.resolve(__dirname, '..', 'loader/less-css-modules-assets-fix-loader.js')
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                // 当前项目，启用CSS modules
                test: /\.css$/,
                include: [config.srcPath],
                exclude: [config.libPath],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]-[local]-[hash:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    ]
                })
            },
            {
                // 依赖库，禁用CSS modules
                test: /\.css$/,
                include: [config.libPath],
                exclude: [config.srcPath],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.woff(\?.*)?$/,
                use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?.*)?$/,
                use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff2'
            },
            {
                test: /\.otf(\?.*)?$/,
                use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=font/opentype'
            },
            {
                test: /\.ttf(\?.*)?$/,
                use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?.*)?$/,
                use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]'
            },
            {
                test: /\.svg(\?.*)?$/,
                use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: 'url-loader?limit=8192'
            }
        ],
    },
    resolve: {
        alias: {
            'ASYNC': config.srcPath
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            template: './template/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'styles.[contenthash].css'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            sourceMap: false,
            comments: false
        }),
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                if(module.resource && (/^.*\.(css|scss|less)$/).test(module.resource)) {
                    return false;
                }
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: config.srcPath + '/static',
                to: config.outputPath,
                ignore: ['.*']
            }
        ])
    ]
};
