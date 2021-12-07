const { DataTypes } = require("sequelize");

const tableStructure = {
  // The following specification of the 'id' attribute could be omitted
  // since it is the default.
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      // We require usernames to have length of at least 3, and
      // only use letters, numbers and underscores.
      is: /^\w{3,}$/,
    },
  },

  user_password: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
  },


  phone: {
    type: DataTypes.STRING,
  },

};

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define('user', tableStructure)
};
