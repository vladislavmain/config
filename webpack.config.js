const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');

const dev = process.env.NODE_ENV === 'development';
const prod = !dev;

const fileName = ext => dev?`.${ext}`:`[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './js/main.js',
    output: {
        filename: `js/[name]${fileName('js')}`,
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.html?$/,
                loader: 'html-loader'
            },
            {
                test: /\.s[ca]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: `img/[name]${fileName('[ext]')}`,
                    esModule: false
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `css/[name]${fileName('css')}`
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: `./index.html`,
            minify: {
                collapseWhitespace: prod
            }
        }),
        new CssUrlRelativePlugin()
    ],
    devServer: {
        port: 9000
    }
};