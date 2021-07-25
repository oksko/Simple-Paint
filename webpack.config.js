const TerserPlugin = require('terser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./scripts/index.js'],
    optimization: {
        minimizer: [new TerserPlugin()],
      },
    output: {
      filename: 'min.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
        port: 8000,
        historyApiFallback: true,
        hot: true,
    },
  };