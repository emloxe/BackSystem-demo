var mongoose = require('mongoose')

var schema = require('../article-list')
var User = mongoose.model('enArticleList', schema, 'en-article-list')

module.exports = User
