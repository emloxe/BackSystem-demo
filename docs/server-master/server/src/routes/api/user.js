const returnJSON = require('./json')
const router = require('koa-router')()
const { isEn } = require('../../utils/i18n')
const enFeatureData = require('../../doc/database/en/feature.json')
const zhFeatureData = require('../../doc/database/zh/feature.json')
const enChapterData = require('../../doc/database/en/chapter.json')
const zhChapterData = require('../../doc/database/zh/chapter.json')

/**
 * 获取项目功能
 */
router.get('/feature', async (ctx, next) => {
  let json = { ...returnJSON }
  let data
  if (isEn(ctx)) {
    data = enFeatureData
  } else {
    data = zhFeatureData
  }
  data.forEach((item, index) => {
    item.id = index + 1
  })
  json.data = data
  json.message = ctx.res.__('profile.success')
  ctx.body = json
})

/**
 * 获取章节
 */
router.get('/chapter', async (ctx, next) => {
  let json = { ...returnJSON }
  let data
  if (isEn(ctx)) {
    data = enChapterData
  } else {
    data = zhChapterData
  }
  data.forEach((item, index) => {
    item.id = index + 1
  })
  json.data = data
  json.message = ctx.res.__('profile.success')
  ctx.body = json
})

module.exports = router.routes()
