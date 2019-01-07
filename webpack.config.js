let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist/js'
    },

    module: {
        rules:[
            {
                test: /\.js$/,
                use: "babel-loader"
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html', filename:'../index.html'})
    ],
    mode: 'production'
};