
/* eslint-disable max-len */
const Koa = require('koa');

const staticCache = require('koa-static-cache'); // 静态资源
const responseTime = require('koa-response-time');
const compress = require('koa-compress'); // 压缩数据来提高传输速度
const bodyParser = require('koa-bodyparser');
const session = require('koa-session'); // 信息持久化存储，记录当前用户登入账号
const CSRF = require('koa-csrf'); // 跨站请求伪造
const cors = require('@koa/cors');
const path = require('path');

const registerRouter = require('./routers');
const conf = require('./config'); // 默认配置
const swaggerInstall = require('./swagger');


const app = new Koa();

/**
 * responseTime middleware
 * @see https://github.com/koajs/response-time
 */
app.use(responseTime());

/**
 * compress middleware
 * @see https://github.com/koajs/compress
 */
app.use(compress());

/**
 * staticCache  middleware
 * @see https://github.com/koajs/static-cache
 */
app.use(staticCache(__dirname)); // 当前目录作为静态资源目录
app.use(staticCache(path.join(__dirname, '../static'))); // 当前目录作为静态资源目录
app.use(staticCache(path.join(__dirname, '../static'), {
  prefix: '/dist', // 指定目录添加路由前缀
}));


app.use(async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url}`); // 打印URL
  await next(); // 调用下一个middleware
});

// app.use(staticCache(path.join(__dirname, '../views')));
app.use(staticCache(path.join(__dirname, '../static')));

// const CONFIG = {
//   key: 'koa:sess',
//   /** (string) cookie key (default is koa:sess) */
//   /** (number || 'session') maxAge in ms (default is 1 days) */
//   /** 'session' will result in a cookie that expires when session/browser is closed */
//   /** Warning: If a session cookie is stolen, this cookie will never expire */
//   maxAge: 0,
//   autoCommit: true,
//   /** (boolean) automatically commit headers (default true) */
//   overwrite: true,
//   /** (boolean) can overwrite or not (default true) */
//   httpOnly: true,
//   /** (boolean) httpOnly or not (default true) */
//   signed: true,
//   /** (boolean) signed or not (default true) */
//   rolling: false,
//   /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
//   renew: false,
//   /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
// };

// /**
//  * session middleware
//  * @see https://github.com/koajs/session
//  */
// app.use(session(CONFIG, app));

// /**
//  * csrf middleware 使用koa-csrf防范跨站请求伪造攻击
//  * @see https://github.com/koajs/csrf
//  */
//  app.use(new CSRF({
//   invalidTokenMessage: 'Invalid CSRF token',
//   invalidTokenStatusCode: 403,
//   excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
//   disableQuery: false
// }));

/**
 * cors middleware 允许跨域
 * @see https://github.com/koajs/cors
 */
app.use(cors());

/**
 * bodyparser middleware
 * @see https://github.com/koajs/bodyparser
 */
app.use(bodyParser());

if (conf.login) { // 如果配置登入， 路由重定向到登入页面
    const allowPage = ['/login.html', '/api/v1/login'];
    app.use(async (ctx, next) => {
        let url = ctx.path;
        if (!ctx.cookies.get('koa:sess') && allowPage.indexOf(url) < 0) {
            ctx.redirect('/login.html');
            return;
        }
        await next();
    });
}



app.use(registerRouter());
swaggerInstall(app);

app.use(async (ctx) => { // 404
  ctx.status = 404;

  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>Page Not Found</p>';
      break;
    case 'json':
      ctx.body = {
        message: 'Json Not Found',
      };
      break;
    default:
      ctx.type = 'text';
      ctx.body = 'Text Not Found';
  }
});

module.exports =  app;