var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = function (metadata) {
  return webpackMerge(commonConfig(metadata), {
      devtool: 'cheap-module-eval-source-map',

      output: {
          path: helpers.root('dist'),
        
          filename: '[name].js',
          chunkFilename: '[id].chunk.js'
      },

      plugins: [
          new ExtractTextPlugin('[name].css')
      ],

      devServer: {
          port: 8080,
          host: "0.0.0.0",
          historyApiFallback: true,
          stats: 'minimal'
      }
  });
};
