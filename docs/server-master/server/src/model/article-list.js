var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  ranking: { type: Number },
  title: { type: String },
  author: { type: String },
  publicDate: { type: String },
  desc: { type: String },
  content: { type: String }
})

module.exports = schema
