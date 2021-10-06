"use strict";
/* eslint-disable */
const { Model } = require("sequelize");
class ProductCategory extends Model {
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
  ProductCategory.init(
    {
      title: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      size: DataTypes.NUMBER,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductCategory",
    }
  );
  return ProductCategory;
};
