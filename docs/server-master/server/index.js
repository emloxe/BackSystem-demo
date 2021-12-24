/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
String.prototype.bool = function () {
  return /^true$/i.test(this)
}

const Koa = require('koa'),
  Router = require('koa-router'),
  Static = require('koa-static'),
  Session = require('koa-session'),
  cors = require('koa2-cors'),
  BodyParser = require('koa-bodyparser'),
  path = require('path'),
  compress = require('koa-compress'),
  jsonp = require('koa-jsonp'),
  i18n = require('./src/i18n')
api = require('./src/routes/api') // 后端接口
;(url = require('url')), require('./src/model/db') // 引入数据库

// 初始化web服务
const app = new Koa()
const router = new Router()
// 配置跨域
app.use(cors())
//配置session
app.keys = ['secret sunday']
app.use(
  Session(
    {
      key: 'koa:sess',
      maxAge: 2 * 3600 * 1000,
      overwrite: true, //是否可以 overwrite (默认 default true)
      httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true)
      signed: true, //签名默认 true
      rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
      renew: false //(boolean) renew session when session is nearly expired, };
    },
    app
  )
)
//配置静态资源
app.use(Static(path.join(__dirname, 'public')))
app.use(Static(path.join(__dirname, 'statics')))
//配置post请求数据接收
app.use(BodyParser())
//jsonp
app.use(jsonp())

//gzip
app.use(
  compress({
    filter: function (content_type) {
      return true
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
  })
)

/**
 * 全局配置
 */
router.use(async (ctx, next) => {
  //国际化初始化
  i18n.init(ctx.req, ctx.res)
  var pathname = url.parse(ctx.url).pathname
  if (pathname === '/api/sys/login') {
    // 如果是登录直接放过
    await next()
  } else {
    let { authorization } = ctx.request.header
    if (
      authorization &&
      ctx.session.user &&
      ctx.session.user.token === authorization.split(' ')[1]
    ) {
      try {
        await next()
      } catch (error) {
        ctx.body = {
          message: '程序执行遇到异常！异常信息：' + error.message,
          success: false,
          code: 505,
          data: null
        }
      }
    } else {
      ctx.status = 401 // 超时token
      ctx.body = {
        message: authorization ? 'token超时' : '您还未登录',
        success: false,
        code: 401,
        data: null
      }
    }
  }
})

// 启动入口
router.get('/', async (ctx) => {
  ctx.body = '欢迎访问 imooc-admin'
})
router.use('/api', api)

app.use(router.routes())

//启动路由
app.use(router.allowedMethods())
//启动服务器
app.listen(3004, (err) => {
  console.log('接口启动：http://localhost:3004')
})
