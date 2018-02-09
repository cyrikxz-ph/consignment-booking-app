const path = require('path');
const dotenv = require('dotenv');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test'})
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development'})
}

module.exports = (env) => {
  const isProduction = env === 'production';
  const CssExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },{
        test: /\.s?css$/,
        use: CssExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CssExtract,
      new webpack.DefinePlugin({
        'process.env.CONSEGNAME_API_URL': JSON.stringify(process.env.CONSEGNAME_API_URL)
      })
    ],
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  }
};