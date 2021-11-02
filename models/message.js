'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: 'sender',
        as: 'sendMsg',
      });
      Message.belongsTo(models.User, {
        foreignKey: 'receiver',
        as: 'recMsg',
      });
    }
  }
  Message.init(
    {
      message: DataTypes.STRING,
      sender: DataTypes.INTEGER,
      receiver: DataTypes.INTEGER,
      room: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Message',
    },
  );
  // Message.sync({ alter: true });
  return Message;
};
