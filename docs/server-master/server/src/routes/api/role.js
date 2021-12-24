const returnJSON = require('./json')
const router = require('koa-router')()
const { isEn } = require('../../utils/i18n')
const enRoleData = require('../../doc/database/en/roles.json')
const zhRoleData = require('../../doc/database/zh/roles.json')

/**
 * 获取所有角色
 */
router.get('/list', async (ctx, next) => {
  let json = { ...returnJSON }
  let roleData
  if (isEn(ctx)) {
    roleData = enRoleData
  } else {
    roleData = zhRoleData
  }
  json.data = roleData.map((item) => {
    return {
      id: item.id,
      title: item.title,
      describe: item.describe
    }
  })
  json.message = ctx.res.__('profile.success')
  ctx.body = json
})

/**
 * 获取指定角色的权限
 */
router.get('/permission/:roleId', async (ctx, next) => {
  let { roleId } = ctx.params
  let json = { ...returnJSON }
  let roleData
  if (isEn(ctx)) {
    roleData = enRoleData
  } else {
    roleData = zhRoleData
  }
  json.data = roleData.find((item) => item.id == roleId).permissions
  json.message = ctx.res.__('profile.success')
  ctx.body = json
})

/**
 * 为指定角色分配权限
 */
router.post('/distribute-permission', async (ctx, next) => {
  let { roleId, permissions } = ctx.request.body
  let json = { ...returnJSON }

  // 不允许修改 超管 和 管理员权限
  if (roleId == '1' || roleId == '2') {
    json.success = false
    json.message = ctx.res.__('user.changeError')
    ctx.body = json
    return
  }

  if (!permissions || !(permissions instanceof Array)) {
    json.success = false
    json.message = ctx.res.__('role.permissionArray')
    ctx.body = json
    return
  }

  let roleData
  if (isEn(ctx)) {
    roleData = enRoleData
  } else {
    roleData = zhRoleData
  }
  const role = roleData.find((item) => item.id == roleId)
  if (!role) {
    json.success = false
    json.message = ctx.res.__('role.noRole')
    ctx.body = json
    return
  }
  role.permissions = permissions
  json.message = ctx.res.__('update.success')
  ctx.body = json
})

module.exports = router.routes()
