"use strict";
/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProductCategories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProductCategories");
  },
};
