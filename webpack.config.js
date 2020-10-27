const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');



const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction', isProduction);
console.log(process.env.NODE_ENV)

module.exports = {
  mode: process.env.NODE_ENV || 'development',
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
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
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
    }),
    new CnameWebpackPlugin({
      domain: 'aviasales-frontend-test-task.surge.sh',
    }),
    new MiniCssExtractPlugin(),
    // new CompressionPlugin({
    //   test: /\.(js|css|html|svg)$/,
    //   compressionOptions: {
    //     // zlib’s `level` option matches Brotli’s `BROTLI_PARAM_QUALITY` option.
    //     level: 9,
    //   },
    // }),
    // new BundleAnalyzerPlugin(),
  ],
  // optimization: {
    // minimizer: [
    //   new TerserPlugin({  parallel: true }),
    //   new OptimizeCSSAssetsPlugin({}),
    // ],
    // runtimeChunk: 'single',
    // // moduleIds: 'deterministic',
    // splitChunks: {
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },
  // },

  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new CssMinimizerPlugin({
  //       test: /\.css$/,
  //       exclude: /\.(js|jsx)$/,
  //     }),
  //   ],
  // },
  devServer: {
    contentBase: './src/public',
    port: 4000,
  },
  devtool: process.env.NODE_ENV ? '' : 'source-map',
};
