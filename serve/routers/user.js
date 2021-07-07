const Router = require("koa-router"),
  uuid = require("uuid"),
  md5 = require("md5");
const config = require("../config");
const model = require("../models/user");

const router = new Router();

router.prefix(`${config.api}/user`);

router.get("/all", async (ctx, next) => {
  let data = await model.findAll();
  ctx.body = data.code ? data : { code: 0, data: data };
});


// 登陆
router.post("/login", async (ctx, next) => {
  let user = ctx.request.body;
  let data = await models.user.findAll();
//   console.log(JSON.stringify(ctx.query))
  ctx.body = data.code ? data : { code: 0, data: data };
});

// 注册
router.post("/register", async (ctx, next) => {
  let user = ctx.request.body;
  let data = await models.user.findAll();
//   console.log(JSON.stringify(ctx.query))
  ctx.body = data.code ? data : { code: 0, data: data };
});

// 重置密码
router.put("/password", async (ctx, next) => {
  let user = ctx.request.body;
  let data = await models.user.findAll();
//   console.log(JSON.stringify(ctx.query))
  ctx.body = data.code ? data : { code: 0, data: data };
});

// 重置用户信息
router.put("/info", async (ctx, next) => {
  let user = ctx.request.body;
  let data = await models.user.findAll();
//   console.log(JSON.stringify(ctx.query))
  ctx.body = data.code ? data : { code: 0, data: data };
});

// 删除用户
router.delete("/", async (ctx, next) => {
  let user = ctx.request.body;
  let data = await models.user.findAll();
//   console.log(JSON.stringify(ctx.query))
  ctx.body = data.code ? data : { code: 0, data: data };
});

// router.post('/', async (ctx, next) => {
//     let user = ctx.request.body;
//     let service = new Service();
//     let data = await service.addQueryUser({key: 'users', val: user}, ctx.session.user.username);
//     ctx.body = data.code?data:{code: 0, data: data}
// })

// router.delete('/', async (ctx, next) => {
//     let user = ctx.request.body;
//     let service = new Service();
//     let data = await service.deleteQueryUser({key: 'users', val: user.data},ctx.session.user.username);
//     ctx.body = data.code?data:{code: 0, data: data}
// })

// router.put('/', async (ctx, next) => {
//     let user = ctx.request.body;
//     let service = new Service();
//     let data = await service.upDateQueryUser({key: 'users', val:user},ctx.session.user.username);
//     ctx.body = data.code?data:{code: 0, data: data}
// })

module.exports = router;
