"use strict";

/* eslint-disable */
const { Model } = require("sequelize");

class Product extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}

module.exports = (sequelize, DataTypes) => {
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.NUMBER,
      imageUrl: DataTypes.STRING,
      price: DataTypes.NUMBER,
      categoryId: DataTypes.NUMBER,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
