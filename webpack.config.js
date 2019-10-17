const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    hot: true,
    // bundled files are available in the browser under this path
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
    historyApiFallback: true,
    /* tells server where you want to serve files from
    * only necessary if you want to serve static files
    * publicPath takes precedence
    * By default it will use your current working directory to serve content
    * to disable contentBase set it to false */
    contentBase: path.join(__dirname, 'build'),
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
    ],
  },
  output: {
    // where to store the bundle file after it's compiled
    path: path.resolve(__dirname, 'build'),
    // public URL of the output directory when referenced in a directory
    // publicPath: '/',
    publicPath: '/build/',
    filename: 'bundle.js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
