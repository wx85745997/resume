var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/main',
        'webpack-dev-server/client?http://localhost:8080'
    ],
    output: {
        publicPath: '/',
        filename: 'main.js'
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.less$/,
                loader: "style!css!autoprefixer!less"
            },
        ]
    },
    devServer: {
        contentBase: "./src",
 /*       host: '192.168.0.102',
        inline: true,
        port: 8080,
        colors: true*/
    }
};
