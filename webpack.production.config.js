//TODO: At the moment this is the dev config
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'src/phaser.js');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  WEBGL_RENDERER: true,
  CANVAS_RENDERER: true
});

module.exports = {
  entry: {
    app: [path.resolve(__dirname, 'src/main.ts')],
    vendor: ['phaser']
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    library: '[name]',
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  watch: false,
  plugins: [
    definePlugin,
    new HtmlWebpackPlugin({
      filename: 'index.html', //path.resolve(__dirname, 'build', 'index.html'),
      template: './src/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      },
      hash: false
    }),
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' }
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser
    }
  }
};
