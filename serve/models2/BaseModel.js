const Sequelize = require('sequelize');
const uuidv4 = require('uuid/v4');
const { sleep } = require('../utils');

const {
  username,
  password,
  database,
  host,
  port,
  timezone,
  logging,
} = require('../config').db_config;

/**
 * 新建 Sequelize 实例
 * @function
 * @name mysqlCon
 * @param {string} database 数据库名称
 * @param {string} username 用户名
 */
const create = (setDatabase = true) => new Sequelize(setDatabase ? database : '', username, password, {
  host,
  port,
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone,
  // 请参考 Querying - 查询 操作符 章节
  operatorsAliases: false,
  logging,
});

let sequelize;
let isLoading = false;
// eslint-disable-next-line no-async-promise-executor
const getSequelize = () => new Promise(async (resolve, reject) => {
  if (sequelize) {
    resolve(sequelize);
  } else if (isLoading) {
    while (isLoading === true) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(0.1);
    }
    resolve(sequelize);
  } else {
    isLoading = true;
    const tempSequelize = create(false);
    tempSequelize
      .query(`CREATE DATABASE IF NOT EXISTS ${database};`)
      .then((data) => {
        tempSequelize.close();
        isLoading = false;
        sequelize = create();
        resolve(sequelize);
      })
      .catch((err) => {
        tempSequelize.close();
        isLoading = false;
        reject(err);
      });
  }
});

/**
 * 表模型的基类
 */
class BaseModel {
  constructor(tableName, tableStructure, option, callback) {
    /** 创建表的时候，指定字符集，兼容低版本的 mysql 数据库 */
    Object.assign(option, {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });

    getSequelize().then((sequelize) => {
      this.orm = sequelize.define(tableName, tableStructure, option);

      // eslint-disable-next-line no-return-assign
      this.orm.beforeCreate((data, _) => data.uuid = uuidv4());

      this.orm.sync(
        { alter: true },
      ).then((result) => {
        // 同步了模型以后，执行回调
        if (result && callback) {
          callback(this.orm);
        }
      });
    });
  }

  // 单个查询
  get(data) {
    return this.orm.findOne({
      where: data,
    });
  }

  // 批量查询
  batchGet(obj) {
    return this.orm.findAll({
      where: obj,
    });
  }

  // 全部查询
  findAll() {
    return this.orm.findAll();
  }

  // 单个增加
  async add(data) {
    return this.orm.create(data);
  }

  // 单个移出 传null表示删除全部
  remove(data) {
    if (Object.keys(data).length > 0) {
      return this.orm
        .destroy({
          where: data,
        })
        .then(
          (result) => new Promise((resolve, reject) => {
            resolve('ok');
          }),
        );
    }
    return this.orm
      .destroy({
        truncate: true,
        cascade: false,
      })
      .then(
        (result) => new Promise((resolve, reject) => {
          resolve('ok');
        }),
      );
  }

  /**
   * 批量删除，传入要删除的数据的要求什么的。
   * obj 格式示例 obj = {
   *                  id: idsArray,
   *              }
   */
  batchRemove(obj) {
    return this.orm
      .destroy({
        where: obj,
      })
      .then(
        () => new Promise((resolve) => {
          resolve('ok');
        }),
      );
  }

  // 单个更新
  update(obj) {
    return this.orm
      .update(obj, {
        where: {
          id: obj.id,
        },
      })
      .then(
        () => new Promise((resolve) => {
          resolve('ok');
        }),
      );
  }

  addOrUpdate(data) {
    const self = this;
    return this.get({
      id: data.id,
    }).then((result) => {
      if (result) {
        return self.update(data);
      }
      return self.add(data);
    });
  }

  batchAddOrUpdate(data) {
    const self = this;
    return Promise.each(data, (d) => self.addOrUpdate(d));
  }
}

module.exports = BaseModel;
