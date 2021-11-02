'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      sender: {
        type: Sequelize.INTEGER,
        references: {
					model: 'Users',
					key: 'id',
					as: 'sendRoom',
				},
      },
      receiver: {
        type: Sequelize.INTEGER,
        references: {
					model: 'Users',
					key: 'id',
					as: 'recRoom',
				},
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
    await queryInterface.dropTable('Rooms');
  }
};