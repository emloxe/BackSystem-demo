const returnJSON = require('./json')
const router = require('koa-router')()
const UUID = require('uuid')
const zhUserModel = require('../../model/zh/user-list')
const enUserModel = require('../../model/en/user-list')
const enRoleData = require('../../doc/database/en/roles.json')
const zhRoleData = require('../../doc/database/zh/roles.json')
const enPermissionData = require('../../doc/database/en/permission.json')
const zhPermissionData = require('../../doc/database/zh/permission.json')
const { isEn } = require('../../utils/i18n')

/**
 * 登录
 */
router.post('/login', async (ctx, next) => {
  let { username, password } = ctx.request.body
  let json = { ...returnJSON }
  if (!username || !password) {
    json.message = ctx.res.__('login.isNull')
    json.success = false
  } else {
    let userModel
    if (isEn(ctx)) {
      userModel = enUserModel
    } else {
      userModel = zhUserModel
    }
    // 查询数据
    const people = await userModel.findOne({ username, password: password.toUpperCase() }).lean()
    if (people) {
      console.log(username + ': 登录成功')
      const token = UUID.v4() // 生成一个token
      json.message = ctx.res.__('login.success')
      json.success = true
      json.data = {
        token
      }
      // 设置session
      ctx.session.user = { token, ...people } // 设置用户的token
    } else {
      json.message = ctx.res.__('login.error')
      json.success = false
    }
  }
  ctx.body = json
})

/**
 * 获取用户信息
 */
router.get('/profile', async (ctx, next) => {
  let userModel, roleData, permissionData
  if (isEn(ctx)) {
    userModel = enUserModel
    roleData = enRoleData
    permissionData = enPermissionData
  } else {
    userModel = zhUserModel
    roleData = zhRoleData
    permissionData = zhPermissionData
  }

  let json = { ...returnJSON }
  const user = await userModel.findOne(
    {
      id: ctx.session.user.id
    },
    ['username', 'title', 'id', 'avatar', 'role']
  )

  if (!user) {
    json.success = false
    json.message = ctx.res.__('profile.userError')
    ctx.body = json
    return
  }
  // const selectRoleId = roleData.filter(item => {
  //   item.
  // })

  const permissionKeys = getUserPermissionKeys(ctx, user)

  const permissions = getPermission(ctx, permissionKeys)
  user._doc.permission = permissions

  json.data = user
  json.message = ctx.res.__('profile.success')
  ctx.body = json
})

function getUserPermissionKeys(ctx, user) {
  let roleData
  if (isEn(ctx)) {
    roleData = enRoleData
  } else {
    roleData = zhRoleData
  }
  const result = []
  user.role.forEach((item) => {
    roleData.forEach((roleItem) => {
      if (item.id === roleItem.id) {
        result.push(...roleItem.permissions)
      }
    })
  })
  return result
}

function getPermission(ctx, keys) {
  let permissionData
  if (isEn(ctx)) {
    permissionData = enPermissionData
  } else {
    permissionData = zhPermissionData
  }
  const lateralPermission = getLateralPermission(permissionData)

  const menus = []
  const points = []
  keys.forEach((key) => {
    const permission = lateralPermission[key]
    if (key.includes('-')) {
      points.push(permission.permissionMark)
    } else {
      menus.push(permission.permissionMark)
    }
  })
  return {
    menus,
    points
  }
}

function getLateralPermission(permissionData) {
  let result = {}
  permissionData.forEach((item) => {
    result[item.id] = {
      id: item.id,
      permissionName: item.permissionName,
      permissionMark: item.permissionMark,
      permissionDesc: item.permissionDesc
    }
    if (item.children && item.children.length > 0) {
      result = {
        ...result,
        ...getLateralPermission(item.children)
      }
    }
  })
  return result
}

const { STS } = require('ali-oss')

/**
 * 阿里云 sts
 */
router.get('/sts', async (ctx, next) => {
  let json = { ...returnJSON }
  let sts = new STS({
    // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
    accessKeyId: 'LTAI5tN5UcgD5KSNdfLBkqoM',
    accessKeySecret: '1XGsblO0HjWDnk8TfCScbxm8Wa4Y6o'
  })
  // https://help.aliyun.com/document_detail/28763.html
  const result = await sts.assumeRole('acs:ram::1211026263114215:role/imooc-admion')

  json.data = {
    AccessKeyId: result.credentials.AccessKeyId,
    AccessKeySecret: result.credentials.AccessKeySecret,
    SecurityToken: result.credentials.SecurityToken,
    Expiration: result.credentials.Expiration
  }
  json.message = ctx.res.__('profile.success')
  ctx.body = json
})

module.exports = router.routes()
