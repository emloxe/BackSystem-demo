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
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
    validate: {},
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    default: 'e10adc3949ba59abbe56e057f20f883e'
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },


};

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("user", tableStructure);
};
