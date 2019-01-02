/**
 * wepack 开发环境配置
*/

const Webpack = require('webpack')
const merge = require('webpack-merge')
// 优化 webpack 输出信息
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const uitls = require('./utils')
const baseConfig = require('./webpack.config.base')

const config = merge(baseConfig, {
  devtool: '#cheap-module-source-map',
  mode: 'development',
  stats: { children: false },
  entry: {
    index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=false', uitls.resolve('src/index.js')]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    // 全局开启代码热替换
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  ],
  // TODO: 妈的 自己还不理解这里 不要瞎鸡巴配置 要不导致 Dev 下代码不执行
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     name: false,
  //   },
  //   runtimeChunk: true,
  // },
})

module.exports = config
