const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

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
            // @babel/plugin-transform-runtime enables async await and fetch API
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-transform-arrow-functions',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Simple file-loader - outputs files to a directory
      // {
      //   test: /\.(png|jp(e*)g|gif|svg)$/,
      //   use: ['file-loader']
      // },
      {
        // If an image is small, load the file into the bundle
        // If it's larger, use file-loader
        test: /\.(png|jp(e*)g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
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
      filename: '../dist/index.html',
    }),
    // for copying files from one folder to another
    // not necessary when using the url-loader above
    // new CopyWebpackPlugin([ {
    //   from: 'assets',
    //   to: 'images',
    // } ]),
  ],
};
