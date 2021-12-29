const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // pages: {
  //   // 配置多页面入口
  //   // login: {
  //   //   entry: 'src/pages/login/login.js',
  //   //   template: 'public/login.html',
  //   // },
  //   // index: {
  //   //   entry: 'src/pages/manager/main.js',
  //   //   template: 'public/manager.html',
  //   // },
  // },
  devServer: {
    port: 8085,
    //   proxy: {
    //     '/v1/api': {
    //       // 匹配所有以 '/api1'开头的请求路径
    //       target: 'http://127.0.0.1:3001', // 代理目标的基础路径
    //       changeOrigin: true,
    //     },
    //   },
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    // config 为 webpack 配置对象
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('svg')
      // 忽略
      .exclude.add(resolve('src/icons'))
      // 结束
      .end();
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('icons')
      // 正则，解析 .svg 格式文件
      .test(/\.svg$/)
      // 解析的文件
      .include.add(resolve('src/icons'))
      // 结束
      .end()
      // 新增了一个解析的loader
      .use('svg-sprite-loader')
      // 具体的loader
      .loader('svg-sprite-loader')
      // loader 的配置
      .options({
        symbolId: 'icon-[name]',
      })
      // 结束
      .end();
  },
};
