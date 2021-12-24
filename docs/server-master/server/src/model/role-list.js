var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  id: { type: String },
  title: { type: String }
})

module.exports = schema
