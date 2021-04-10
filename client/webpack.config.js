const path = require('path');
const PUB = path.resolve(process.env.PWD, 'dist');
const reviewsSrc = path.resolve(process.env.PWD, 'reviews', 'src');
const nearbySrc = path.resolve(process.env.PWD, 'nearby', 'src');
const locationSrc = path.resolve(process.env.PWD, 'location');
const photosSrc = path.resolve(process.env.PWD, 'photos', 'src');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

module.exports = {
    entry: {
        reviews: path.resolve(__dirname, 'reviews', 'src', 'index.jsx'),
        nearby: path.resolve(__dirname, 'nearby', 'src', 'index.jsx'),
        location: path.resolve(__dirname, 'location', 'index.js'),
        photos: path.resolve(__dirname, 'photos', 'src', 'index.jsx'),
    },
    mode: 'production',
    output: {
        path: PUB,
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: [
        new CompressionPlugin(),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new EnvironmentPlugin({ KEY: process.env.KEY }),
    ],
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: 'babel-loader',
                include: [reviewsSrc, nearbySrc, locationSrc, photosSrc],
            },
            {
                test: /\.(scss|css)$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
