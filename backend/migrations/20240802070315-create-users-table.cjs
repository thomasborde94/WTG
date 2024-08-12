// migrations/{timestamp}-create-users-table.cjs

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      // Ajoutez d'autres champs si nécessaire
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
