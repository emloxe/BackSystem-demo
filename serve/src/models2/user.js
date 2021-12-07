const Sequelize = require('sequelize');
const BaseModel = require('./BaseModel');

/** 场景表 */
const tableName = 'user';

const tableStructure = {
  uuid: {
    type: Sequelize.STRING,
    primaryKey: true,
    searchable: true,
    unique: true,
  },

  user_name: {
    type: Sequelize.STRING,
    primaryKey: true,
    searchable: true,
    unique: true,
  },

  user_password: {
    type: Sequelize.STRING, 
  },

  email: {
    type: Sequelize.STRING, 
  },


  phone: {
    type: Sequelize.STRING, 
  },

};

const option = {
  tableName,
};

module.exports = new BaseModel(tableName, tableStructure, option);
