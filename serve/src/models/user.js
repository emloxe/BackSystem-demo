const { models }  = require("../sequelize/index");

const BaseModel = require('./BaseModel')

class User extends BaseModel {
  init () {
    this.orm = models.user;
  }
}


module.exports =  new User();
