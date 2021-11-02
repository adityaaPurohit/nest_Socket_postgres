'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(models.User, {
        foreignKey: 'sender',
        as: 'sendRoom',
      });
      Room.belongsTo(models.User, {
        foreignKey: 'receiver',
        as: 'recRoom',
      });
    }
  }
  Room.init(
    {
      title: DataTypes.STRING,
      sender: DataTypes.INTEGER,
      receiver: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Room',
    },
  );
  // Room.sync({ alter: true });
  return Room;
};
