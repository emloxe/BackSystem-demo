const path = require("path");
// less文件的路径
const myTheme = path.resolve(__dirname, "./src/assets/vantChange.less");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  pages: {
    // 配置多页面入口
    // login: {
    //   entry: 'src/pages/login/login.js',
    //   template: 'public/login.html',
    // },
    index: {
      entry: "src/pages/manager/main.js",
      template: "public/manager.html",
    },
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        modifyVars: {
          hack: `true; @import "${myTheme}";`,
        },
      },
    },
  },
  devServer: {
    proxy: {
      "/v1/api": {
        // 匹配所有以 '/api1'开头的请求路径
        target: "http://192.168.15.59:8505", // 代理目标的基础路径
        changeOrigin: true,
      },
    },
  },
};
