const webpack = require("webpack");
const path = require("path");



module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname + '/public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './public'
    },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
      },
}
