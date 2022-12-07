const { models } = require("../sequelize/index");

const BaseModel = require("./BaseModel");

class Mock extends BaseModel {
  init() {
    this.orm = models.mock;
  }
}

module.exports = new Mock();
