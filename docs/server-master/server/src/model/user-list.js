var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  id: { type: String },
  openTime: { type: String },
  username: { type: String },
  title: { type: String },
  mobile: { type: String },
  password: { type: String },
  avatar: { type: String },
  role: { type: Array },
  gender: { type: String },
  nationality: { type: String },
  province: { type: String },
  remark: { type: Array },
  address: { type: String },
  experience: { type: Array },
  major: { type: String },
  glory: { type: String }
})

module.exports = schema
