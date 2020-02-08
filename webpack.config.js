const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';
const prod = !dev;

const fileName = ext => prod?`[name].[hash].${ext}`:`[name].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: `./js/${fileName('js')}`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: `[path]${fileName('[ext]')}`,
                    publicPath: '../'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: prod
            }
        }),
        new MiniCssExtractPlugin({
            filename: `css/${fileName('css')}`
        }),
        new CleanWebpackPlugin()
    ]
};