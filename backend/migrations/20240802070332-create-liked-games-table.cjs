'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('liked_games', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'email',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      game_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('liked_games');
  }
};
