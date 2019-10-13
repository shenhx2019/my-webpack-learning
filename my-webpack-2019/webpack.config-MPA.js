var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 适用webpack4版本前
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// webpack4+推荐版本
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js
const TerserJSPlugin = require('terser-webpack-plugin');
// 分析bundle
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    entry: {
        index: './src/index.js',
        patient: './src/patient.js',
        vendor: ['jquery']
    },
    output: {
        filename: '[name].bundle.[chunkhash].js'
    },
    mode: 'development',
    devServer: {
        publicPath: '/',
        port: 12352
    },
    plugins: [
        new CleanWebpackPlugin({
            options: {
                cleanOnceBeforeBuildPatterns: ['/\.\/dist\//']
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ["patient"],
            title: '第一个demo'
        }),
        new HtmlWebpackPlugin({
            filename: 'index2.html',
            template: './index.html',
            chunks: ["index", "vendor"],
            title: '第二个demo'
        }),
        // new ExtractTextPlugin("bundle.css")
        new MiniCssExtractPlugin({
            filename: '1.[name].css',/* 同步加载 */
            chunkFilename: '2.[id].css',/* 异步加载 */
            ignoreOrder: false
        }),
        new Analyzer({
            openAnalyzer: false,
            analyzerMode: "disabled"
        }),
    ],
    module: {
        rules: [
            /* 从右往左依次解析，并且exclude优先 */
            /*{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            exclude: /node-modules/,
            include: /(assets|src)/
    },*/{
            test: /\.(sc|sa|c)ss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            },
            'css-loader',
            'sass-loader',
            ],
            exclude: /node-modules/,
        },{
            test: /\.less$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            },
            'css-loader',
            {
                loader: 'less-loader',
                options: {
                    sourceMap: true
                }
            },
            ]
        },/*{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        },*/ {
            /* 处理ES6+ */
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [
                        ['@babel/preset-env', {
                            /* 禁用模块语句的转化 */
                            modules: false
                        }]
                    ],
                }
            }
        }, {
            /* 处理其他文件资源 */
            test: /\.(png|jpe?g|gif|svg)$/,
            use: {
                loader: 'file-loader',
                query: {
                    name: 'assets/img/[name].[ext]?[contentHash]'
                }
            }
        },{
            test: /\.js$/,
            use: {
                loader: 'force-strict-loader',
                options: {
                    /*配置sourceMap*/
                    sourceMap: true
                }
            }
        }]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserJSPlugin({

        }), new OptimizeCSSAssetsPlugin({

        })],
    }
}