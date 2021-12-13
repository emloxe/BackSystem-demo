const { models } = require("../sequelize/index");

const BaseModel = require("./BaseModel");

class User extends BaseModel {
  init() {
    this.orm = models.user;
  }

  // 分页查询，不返回密码
  batchGetPageWithoutPw(obj, { page = 1, pageSize = 20 }) {
    let offset = (page - 1) * pageSize;
    return this.orm.findAndCountAll({
      where: obj,
      limit: parseInt(pageSize),
      offset,
      attributes: {
        exclude: ["password"],
      },
    });
  }

  // 单个增加，不返回密码
  // todo 密码依旧返回
  addWithoutPw(data) {
    return this.orm.create(data, {
      attributes: {
        exclude: ["password"],
      },
    });
  }
}

module.exports = new User();
