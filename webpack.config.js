const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './react/index.js',
  mode: 'development',
  // mode: 'production',
  devServer: {
    // bundled files are available in the browser under this path
    publicPath: '/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
    historyApiFallback: true,
    /*
    * Tells server where you want to serve files from
    * - only necessary if you want to serve static files
    * - Determines where the bundles should be served from
    * - By default it will use your current working directory to serve content
    * - To disable contentBase set it to false
    */
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'assets')],
    // contentBase: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ],
  },
  output: {
    // where to store the bundle file after it's compiled
    path: path.resolve(__dirname, 'dist'),
    // public URL of the output directory when referenced in a directory
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Built by Webpack',
      template: './react/index.html',
      filename: path.join(__dirname, './dist/index.html')
    })
  ],
};
