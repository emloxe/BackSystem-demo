const returnJSON = require('./json')
const router = require('koa-router')()
const { isEn } = require('../../utils/i18n')
const enPermissionData = require('../../doc/database/en/permission.json')
const zhPermissionData = require('../../doc/database/zh/permission.json')

/**
 * 获取所有权限
 */
router.get('/list', async (ctx, next) => {
  let json = { ...returnJSON }
  let data
  if (isEn(ctx)) {
    data = enPermissionData
  } else {
    data = zhPermissionData
  }
  json.data = data
  json.message = ctx.res.__('profile.success')
  ctx.body = json
})

module.exports = router.routes()
