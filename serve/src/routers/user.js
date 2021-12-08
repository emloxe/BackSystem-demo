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
  let data = await model.add({});
  ctx.body = data.code ? data : { code: 0, data: data };
});

// 注册
router.post("/register", async (ctx, next) => {
  let userData = ctx.request.body;
  await model
    .add(userData)
    .then((returnData) => {
      ctx.body = { code: 0, msg: "注册成功", data: returnData };
    })
    .catch((reason) => {
      ctx.body = { code: 1, msg: "注册出错", info: reason };
    });
});

// 重置密码
router.put("/rest-password", async (ctx, next) => {
  let { id, oldpassword, newpassword } = ctx.request.body;
  let lastPwd = null;
  let idIstrue = true; // 判断id是否正确
  await model.get({ id }).then((result) => {
    if (result) {
      lastPwd = result.password;
    } else {
      idIstrue = false;
    }
  });

  if (!idIstrue) {
    ctx.body = { code: 1, msg: "修改密码出错", info: '用户id传入出错' };
    return
  }

  if (lastPwd == oldpassword) {
    await model
      .update({ id, password: newpassword })
      .then((returnData) => {
        ctx.body = { code: 0, msg: "修改密码成功", data: returnData };
      })
      .catch((reason) => {
        ctx.body = { code: 1, msg: "修改密码出错", info: reason };
      });
  } else {
    ctx.body = { code: 1, msg: "旧密码不正确" };
  }
});

// 修改用户信息
router.put("/info", async (ctx, next) => {
  let userData = ctx.request.body;
  delete userData.password
  await model
    .update(userData)
    .then((returnData) => {
      ctx.body = { code: 0, msg: "修改成功", data: returnData };
    })
    .catch((reason) => {
      ctx.body = { code: 1, msg: "修改出错", info: reason };
    });
});

// 删除用户
router.delete("/one", async (ctx, next) => {
  let userData = ctx.request.body;

  await model
  .remove({id: userData.id })
  .then((returnData) => {
    ctx.body = { code: 0, msg: "删除成功", data: returnData };
  })
  .catch((reason) => {
    ctx.body = { code: 1, msg: "删除出错", info: reason };
  });;
});

module.exports = router;
