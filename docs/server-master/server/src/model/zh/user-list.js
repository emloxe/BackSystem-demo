var mongoose = require('mongoose')

var schema = require('../user-list')
var User = mongoose.model('zhUserList', schema, 'zh-user-list')

module.exports = User
