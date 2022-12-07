const { DataTypes } = require("sequelize");

const tableStructure = {
  // uuid: {
  //   type: DataTypes.UUID,
  //   searchable: true,
  //   unique: true,
  //   defaultValue: DataTypes.UUIDV4,
  //   allowNull: false,
  // },
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  path: {
    type: DataTypes.STRING,
    unique: false,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  remarks: {
    type: DataTypes.STRING,
    unique: false,
  },
  operatingUserId: {
    type: DataTypes.STRING,
    unique: false,
    field: 'operatinguserid'
  }

};

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("mock", tableStructure);
};
