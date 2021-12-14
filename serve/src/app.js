/* eslint-disable max-len */
const path = require("path");

const Koa = require("koa");
const staticCache = require("koa-static-cache"); // 静态资源
const responseTime = require("koa-response-time");
const compress = require("koa-compress"); // 压缩数据来提高传输速度
const bodyParser = require("koa-bodyparser");
const session = require("koa-session"); // 信息持久化存储，记录当前用户登入账号
const CSRF = require("koa-csrf"); // 跨站请求伪造
const cors = require("@koa/cors");
const jwt = require("jsonwebtoken");
const registerRouter = require("./routers");
const conf = require("./config"); // 默认配置
const swaggerInstall = require("./swagger");

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
app.use(staticCache(path.join(__dirname, "../static"))); // 当前目录作为静态资源目录
app.use(
  staticCache(path.join(__dirname, "../static"), {
    prefix: "/dist", // 指定目录添加路由前缀
  })
);
// swagger文档
swaggerInstall(app);

app.use(async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url}`); // 打印URL
  await next(); // 调用下一个middleware
});

/**
 * bodyparser middleware
 * @see https://github.com/koajs/bodyparser
 */
app.use(bodyParser());

/**
 * cors middleware 允许跨域
 * @see https://github.com/koajs/cors
 */
app.use(cors());

const CONFIG = {
  key: "koa:sess",
  /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 0,
  autoCommit: true,
  /** (boolean) automatically commit headers (default true) */
  overwrite: true,
  /** (boolean) can overwrite or not (default true) */
  httpOnly: true,
  /** (boolean) httpOnly or not (default true) */
  signed: true,
  /** (boolean) signed or not (default true) */
  rolling: false,
  /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false,
  /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
};
app.keys = ["some secret hurr"];
/**
 * session middleware
 * @see https://github.com/koajs/session
 */
app.use(session(CONFIG, app));

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

// 校验token是否过期
app.use(async (ctx, next) => {
  const token = ctx.session.token;
  if (ctx.session.token) {
    let payload = jwt.verify(token, conf.jwtSecret, (err, decoded) => {
      if (err) {
        console.log(err);
        if (err.name == "TokenExpiredError") {
          //token过期
          let str = {
            iat: 1,
            exp: 0,
            msg: "token过期",
          };
          return str;
        } else if (err.name == "JsonWebTokenError") {
          //无效的token
          let str = {
            iat: 1,
            exp: 0,
            msg: "无效的token",
          };
          return str;
        }
      } else {
        return decoded;
      }
    });
    if (payload.iat === 1) {
      ctx.session.token = "";
    }
  }
  await next();
});

if (conf.login) {
  // 如果配置登入， 路由重定向到登入页面
  const allowPage = ['/favicon.ico',conf.api + "/login", conf.api + "/register", "/login", "/register"];
  app.use(async (ctx, next) => {
    let url = ctx.path;
    // if (!ctx.cookies.get("koa:sess") && allowPage.indexOf(url) < 0) {
    if (!ctx.session.token && allowPage.indexOf(url) < 0) {
      ctx.response.redirect("/login");
      return;
    }
    await next();
  });
}

app.use(registerRouter());

app.use(async (ctx) => {
  // 404
  ctx.status = 404;

  switch (ctx.accepts("html", "json")) {
    case "html":
      ctx.type = "html";
      ctx.body = "<p>Page Not Found</p>";
      break;
    case "json":
      ctx.body = {
        message: "Json Not Found",
      };
      break;
    default:
      ctx.type = "text";
      ctx.body = "Text Not Found";
  }
});

module.exports = app;
