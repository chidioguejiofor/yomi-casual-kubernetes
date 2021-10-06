"use strict";
/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      slug: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "ProductCategories", key: "id" },
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
    await queryInterface.dropTable("Products");
  },
};
