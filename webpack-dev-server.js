/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  // quiet: true,
  proxy: {
    '**': { target: 'http://localhost:8001' },
  },
}).listen(8000, () => {
  console.log('Webpack Dev Server listening on port 8000');
});
