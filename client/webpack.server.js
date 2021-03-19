const path = require('path');
const PUB = path.resolve(__dirname, '../../proxy/build');
const SRC = path.resolve(process.env.PWD, 'src');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', SRC + '/components/ReviewsContainer.jsx'],
    mode: 'development',
    target: 'node',
    output: {
        path: PUB,
        filename: 'reviews.js',
        library: 'ReviewsService',
        libraryTarget: 'umd',
        publicPath: '/',
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: 'babel-loader',
                include: SRC,
            },
        ],
    },
};
