'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      sender: {
        type: Sequelize.INTEGER,
        references: {
					model: 'Users',
					key: 'id',
					as: 'sendMsg',
				},
      },
      receiver: {
        type: Sequelize.INTEGER,
        references: {
					model: 'Users',
					key: 'id',
					as: 'recMsg',
				},
      },
      room: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  }
};