const returnJSON = require('./json')
const router = require('koa-router')()
const { isEn } = require('../../utils/i18n')
const zhArticleModel = require('../../model/zh/article-list')
const enArticleModel = require('../../model/en/article-list')

/**
 * 获取文章列表
 */
router.get('/list', async (ctx, next) => {
  let { page, size } = ctx.query
  if (!page) page = 1
  if (!size) size = 10
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
  let articleModel
  if (isEn(ctx)) {
    articleModel = enArticleModel
  } else {
    articleModel = zhArticleModel
  }
  const total = await articleModel.count({})
  const result = await articleModel
    .find({}, ['ranking', 'title', 'author', 'publicDate', 'desc', '_id'])
    .sort({
      ranking: 1
    })
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
 * 文章排序
 * 最初排名：initRanking
 * 最终排名：finalRanking
 */
router.post('/sort', async (ctx, next) => {
  let { initRanking, finalRanking } = ctx.request.body
  let json = { ...returnJSON }

  if (isNaN(initRanking)) {
    json.message = ctx.res.__('article.initRankingNumber')
    json.success = false
    ctx.body = json
    return
  }
  if (isNaN(finalRanking)) {
    json.message = ctx.res.__('article.finalRanking')
    json.success = false
    ctx.body = json
    return
  }

  initRanking = parseInt(initRanking)
  finalRanking = parseInt(finalRanking)

  if (initRanking === finalRanking) {
    json.message = ctx.res.__('article.equalRanking')
    json.success = false
    ctx.body = json
    return
  }

  let articleModel
  if (isEn(ctx)) {
    articleModel = enArticleModel
  } else {
    articleModel = zhArticleModel
  }
  // 根据 《最初排名》，修改 ranking
  const findArticle = await articleModel.findOneAndDelete({
    ranking: initRanking
  })

  if (initRanking > finalRanking) {
    // 排名前移
    // 查到最终排名 && 之后的数据
    const articles = await articleModel
      .find({
        ranking: {
          // 大于 等于
          $gte: finalRanking
        }
      })
      .sort({
        ranking: 1
      })
    // 进行位移操作
    articles.forEach((item, index) => {
      item
        .update({
          ranking: finalRanking + index + 1
        })
        .exec()
    })
    // 修改排序
    findArticle.ranking = finalRanking
  } else {
    // 排名后移
    // 最初位置之后，最终位置（包含）之前
    const articles = await articleModel
      .find({
        ranking: {
          // 最初位置之后
          $gt: initRanking,
          // 最终位置（包含）之前
          $lte: finalRanking
        }
      })
      .sort({
        ranking: 1
      })
    // 进行位移操作
    articles.forEach((item, index) => {
      item
        .update({
          ranking: initRanking + index
        })
        .exec()
    })
    // 修改排序
    findArticle.ranking = finalRanking
  }
  // 插入新数据
  await articleModel.insertMany(findArticle)
  json.message = ctx.res.__('article.rankingSuccess')
  ctx.body = json
})

/**
 * 新增文章
 */
router.post('/create', async (ctx, next) => {
  let { title, content } = ctx.request.body
  let json = { ...returnJSON }

  if (!title) {
    title = ctx.res.__('article.noTitle')
  }

  if (!content) {
    content = ''
  }

  let articleModel
  if (isEn(ctx)) {
    articleModel = enArticleModel
  } else {
    articleModel = zhArticleModel
  }
  const ranking = await articleModel.count({})
  await articleModel.insertMany({
    ranking: ranking + 1,
    author: ctx.session.user.username,
    title,
    //去掉所有的html标记
    desc: content.replace(/<[^>]+>/g, '').substring(0, 18),
    content,
    publicDate: Date.now()
  })

  json.message = ctx.res.__('article.createSuccess')
  ctx.body = json
})

/**
 * 删除文章
 */
router.get('/delete/:id', async (ctx, next) => {
  const whiteDateList = ['1629099597000']
  let { id } = ctx.params
  let json = { ...returnJSON }

  let articleModel
  if (isEn(ctx)) {
    articleModel = enArticleModel
  } else {
    articleModel = zhArticleModel
  }
  const find = await articleModel.findOne({
    _id: id
  })

  if (whiteDateList.includes(find.publicDate)) {
    json.success = false
    json.message = ctx.res.__('article.deleteError')
  } else {
    await articleModel.deleteOne({
      _id: id
    })
    json.message = ctx.res.__('article.deleteSuccess')
  }
  ctx.body = json
})

/**
 * 获取文章详情
 */
router.get('/:id', async (ctx, next) => {
  let { id } = ctx.params
  let json = { ...returnJSON }

  let articleModel
  if (isEn(ctx)) {
    articleModel = enArticleModel
  } else {
    articleModel = zhArticleModel
  }
  let find = await articleModel.findOne({
    _id: id
  })

  if (!find) {
    json.success = false
    json.message = ctx.res.__('article.noFind')
  } else {
    json.data = find
  }
  ctx.body = json
})

/**
 * 修改文章
 */
router.post('/edit', async (ctx, next) => {
  let { id, title, content } = ctx.request.body
  let json = { ...returnJSON }

  if (!title) {
    title = ctx.res.__('article.noTitle')
  }

  if (!content) {
    content = ''
  }

  let articleModel
  if (isEn(ctx)) {
    articleModel = enArticleModel
  } else {
    articleModel = zhArticleModel
  }

  const find = await articleModel.findOne({
    _id: id
  })

  if (!find) {
    json.success = false
    json.message = ctx.res.__('article.noFind')
  } else {
    await articleModel.findOneAndUpdate(
      {
        _id: id
      },
      {
        author: ctx.session.user.username,
        title,
        //去掉所有的html标记
        desc: content.replace(/<[^>]+>/g, '').substring(0, 18),
        content,
        publicDate: Date.now()
      }
    )

    json.message = ctx.res.__('article.editSuccess')
  }
  ctx.body = json
})

module.exports = router.routes()
