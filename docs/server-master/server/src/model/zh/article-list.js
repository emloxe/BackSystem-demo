var mongoose = require('mongoose')

var schema = require('../article-list')
var User = mongoose.model('zhArticleList', schema, 'zh-article-list')

module.exports = User
