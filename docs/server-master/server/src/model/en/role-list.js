var mongoose = require('mongoose')

var schema = require('../role-list')
var User = mongoose.model('enRoleList', schema, 'en-role-list')

module.exports = User
