'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Message, {
        foreignKey: 'sender', // This is FK in order table
        as: 'sendMsg',
      });
      User.hasMany(models.Message, {
        foreignKey: 'receiver', // This is FK in order table
        as: 'recMsg',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      Image:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  // User.sync({ alter: true });
  return User;
};
