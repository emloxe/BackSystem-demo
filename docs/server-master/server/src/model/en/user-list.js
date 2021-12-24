var mongoose = require('mongoose')

var schema = require('../user-list')
var User = mongoose.model('enUserList', schema, 'en-user-list')

module.exports = User
