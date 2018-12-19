// 开发环境的 server
const Koa = require('koa')
const webpack = require('webpack')
const compressible = require('compressible')
const compress = require('koa-compress')

const devMiddleware = require('../server/middleware/webpack/dev')
const hotMiddleware = require('../server/middleware/webpack/hot')
const historyApiFallback = require('../server/middleware/koa2-connect-history-api-fallback')
const devConfig = require('../build/webpack.config.dev')
const uitls = require('../build/utils')


const compiler = webpack(devConfig)

const app = new Koa()

app.use(compress({
  filter: type => !(/event\-stream/i.test(type)) && compressible(type)
}))

app.use(historyApiFallback({ whiteList: ['/api'] }))


app.use(devMiddleware(compiler, {
  contentBase: uitls.resolve('dist'),
  inline: true,    // 设置为true，当源文件改变时会自动刷新页面
  hot: true,       // 告诉 dev-server 我们在使用 HMR 启用 webpack 的模块热替换特性
  compress: true, // 启用gzip 压缩
  publicPath: '/', // 此路径下的打包文件可在浏览器中访问 模块热替换所必需的
  historyApiFallback: true  // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
}))
app.use(hotMiddleware(compiler))

app.listen(3000, (err) => {
  console.error('Server error: \n%s\n%s ', err || '')
})


