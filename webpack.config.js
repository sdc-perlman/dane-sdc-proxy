const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './server/index.js',
    mode: 'production',
    target: 'node',
    externals: [nodeExternals()],

    output: {
        path: path.resolve('dist'),
        filename: 'server.bundle.js',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
        ],
    },
};
