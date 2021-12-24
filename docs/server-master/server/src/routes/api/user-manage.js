const returnJSON = require('./json')
const router = require('koa-router')()
const UUID = require('uuid')
const zhUserListModel = require('../../model/zh/user-list')
const enUserListModel = require('../../model/en/user-list')
const enRoleData = require('../../doc/database/en/roles.json')
const zhRoleData = require('../../doc/database/zh/roles.json')
const { isEn } = require('../../utils/i18n')

/**
 * 获取用户列表
 */
router.get('/list', async (ctx, next) => {
  let { page, size } = ctx.query
  if (!page) page = 1
  if (!size) size = 2
  let json = { ...returnJSON }
  if (isNaN(page)) {
    json.message = ctx.res.__('pageNoNumber')
    json.success = false
    ctx.body = json
    return
  }
  if (isNaN(size)) {
    json.message = ctx.res.__('sizeNoNumber')
    json.success = false
    ctx.body = json
    return
  }
  let userListModel
  if (isEn(ctx)) {
    userListModel = enUserListModel
  } else {
    userListModel = zhUserListModel
  }
  const total = await userListModel.count({})
  const result = await userListModel
    .find({}, ['id', 'openTime', 'username', 'avatar', 'role', 'mobile'])
    .skip((parseInt(page) - 1) * parseInt(size))
    .limit(parseInt(size))
  json.data = {
    list: result,
    total,
    page,
    size
  }

  ctx.body = json
})

/**
 * 获取所有用户列表
 */
router.get('/all-list', async (ctx, next) => {
  let json = { ...returnJSON }
  let userListModel
  if (isEn(ctx)) {
    userListModel = enUserListModel
  } else {
    userListModel = zhUserListModel
  }
  const result = await userListModel.find({}, [
    'id',
    'openTime',
    'username',
    'avatar',
    'role',
    'mobile'
  ])
  json.data = {
    list: result
  }

  ctx.body = json
})

/**
 * 获取用户详情
 */
router.get('/detail/:id', async (ctx, next) => {
  let { id } = ctx.params
  let json = { ...returnJSON }
  let userListModel
  if (isEn(ctx)) {
    userListModel = enUserListModel
  } else {
    userListModel = zhUserListModel
  }
  const user = await userListModel.findOne(
    {
      _id: id
    },
    [
      'id',
      'openTime',
      'username',
      'title',
      'mobile',
      'avatar',
      'role',
      'gender',
      'nationality',
      'remark',
      'address',
      'experience',
      'major',
      'glory'
    ]
  )
  json.data = user
  ctx.body = json
})

// 员工导入（批量）
router.post('/batch/import', async (ctx) => {
  let json = { ...returnJSON }
  let newUserList = ctx.request.body
  if (newUserList && newUserList.length) {
    let userListModel
    let allRoles
    if (isEn(ctx)) {
      userListModel = enUserListModel
      allRoles = enRoleData
    } else {
      userListModel = zhUserListModel
      allRoles = zhRoleData
    }

    newUserList = newUserList.map((item) => {
      if (item.role) {
        if (typeof item.role === 'string') {
          item.role = [item.role]
        }
        if (item.role instanceof Array) {
          item.role = item.role.map((ir) => {
            let findRole = allRoles.find((ar) => {
              return ar.title === ir
            })
            if (!findRole) {
              findRole = {
                id: '6',
                title: ctx.res.__('user.defaultRole')
              }
            }
            return findRole
          })
        }
      }

      return {
        ...item,
        id: UUID.v4(),
        avatar: 'https://res.lgdsunday.club/default-avatar.jpeg',
        // 123456 -> MD5
        password: 'E10ADC3949BA59ABBE56E057F20F883E',
        gender: '',
        nationality: '',
        province: '',
        remark: [],
        address: '',
        experience: [],
        major: '',
        glory: ''
      }
    })
    // 插入多条基本数据的资料
    await userListModel.insertMany(newUserList)
    json.message = ctx.res.__('user.importSuccess')
  } else {
    json.message = ctx.res.__('user.noImportData')
  }
  ctx.body = json
})

// 删除指定员工
router.get('/detele/:userId', async (ctx, next) => {
  let whiteMobileList = ['188xxxx0003', '188xxxx0002', '188xxxx0001']
  let { userId } = ctx.params
  let json = { ...returnJSON }
  let userListModel
  if (isEn(ctx)) {
    userListModel = enUserListModel
  } else {
    userListModel = zhUserListModel
  }

  const findUser = await userListModel.findOne({
    _id: userId
  })

  if (whiteMobileList.includes(findUser.mobile)) {
    json.success = false
    json.message = ctx.res.__('user.deleteError')
  } else {
    await userListModel.deleteOne({
      _id: userId
    })
    json.message = ctx.res.__('user.deleteSuccess')
  }
  ctx.body = json
})

// 获取指定员工的角色
router.get('/role/:userId', async (ctx, next) => {
  let { userId } = ctx.params
  let json = { ...returnJSON }
  let userListModel
  if (isEn(ctx)) {
    userListModel = enUserListModel
  } else {
    userListModel = zhUserListModel
  }

  const findRoles = await userListModel.findOne(
    {
      _id: userId
    },
    ['role']
  )

  json.data = findRoles
  ctx.body = json
})

// 为员工分配角色
router.post('/update-role/:userId', async (ctx, next) => {
  let whiteMobileList = ['188xxxx0001', '188xxxx0002']
  let { userId } = ctx.params
  let { roles } = ctx.request.body
  let json = { ...returnJSON }
  if (!(roles instanceof Array)) {
    json.success = false
    json.message = ctx.res.__('user.rolesIsArray')
    ctx.body = json
    return
  }
  let userListModel
  if (isEn(ctx)) {
    userListModel = enUserListModel
  } else {
    userListModel = zhUserListModel
  }
  // 白名单
  const findUser = await userListModel.findOne({
    _id: userId
  })

  if (whiteMobileList.includes(findUser.mobile)) {
    json.success = false
    json.message = ctx.res.__('user.changeError')
    ctx.body = json
    return
  }
  roles = roles.map((item) => {
    return {
      id: item.id,
      title: item.title
    }
  })
  const user = await userListModel.findOneAndUpdate(
    {
      _id: userId
    },
    {
      role: roles
    }
  )

  if (!user) {
    json.success = false
    json.message = ctx.res.__('user.noUser')
    ctx.body = json
  } else {
    json.message = ctx.res.__('update.success')
    ctx.body = json
  }
})

module.exports = router.routes()
