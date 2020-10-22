const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction', isProduction);

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/dist`,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
            {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/public/index.html`
    }),
    new CopyWebpackPlugin({
      patterns : [{
        from: `${__dirname}/src/public/favicon.ico`,
        to: `${__dirname}/dist`
      }]
    })
  ],
  devServer: {
    contentBase: './src/public',
    port: 4000,
  },
  devtool: process.env.NODE_ENV ? '' : 'source-map',
};
