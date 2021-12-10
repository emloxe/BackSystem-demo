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
    proxy: {
      '/v1/api': {
        // 匹配所有以 '/api1'开头的请求路径
        target: 'http://192.168.15.59:8505', // 代理目标的基础路径
        changeOrigin: true,
      },
    },
  },
};