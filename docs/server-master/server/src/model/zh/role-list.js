var mongoose = require('mongoose')

var schema = require('../role-list')
var User = mongoose.model('zhRoleList', schema, 'zh-role-list')

module.exports = User
