const Router = require("koa-router"),
  uuid = require("uuid"),
  md5 = require("md5");
const config = require("../config");
const model = require("../models/mock");


const router = new Router();

router.prefix(`${config.api}/mock`);


// 获取数据
router.get("/list", async (ctx) => {
  let { page = 1, pageSize = 20 } = ctx.query;
  let all = await model.batchGetPage({}, { page, pageSize });
  ctx.body = {
    code: 0,
    data: {
      list: all.rows,
      total: all.count, // 总共有多少条数据
      page: parseInt(page), // 第几页
    },
  };
});


// 添加
router.post("/add", async (ctx) => {
  let data = ctx.request.body;
  await model
    .add(data)
    .then((returnData) => {
      ctx.body = { code: 0, msg: "添加成功", data: returnData };
    })
    .catch((reason) => {
      ctx.body = {
        code: 1,
        msg: "添加出错",
        error: reason,
      };
    });
});

module.exports = router;
