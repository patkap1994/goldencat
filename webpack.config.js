const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: __dirname + '/dist/js',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
                  use: [ 
                    "css-loader",
                    "resolve-url-loader", 
                    "sass-loader"
                  ]
        })
      }      
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html', filename:'../index.html'}),
    new ExtractTextPlugin("./../css/style.css")
  ],
  mode: 'development'
}