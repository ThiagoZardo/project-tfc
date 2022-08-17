'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      home_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpgrade: 'CASCADE',
        onDelete: 'CASCADE'
      },
      home_team_goals: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      away_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpgrade: 'CASCADE',
        onDelete: 'CASCADE'
      },
      away_team_goals: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      in_progress: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('matches');
  }
};
