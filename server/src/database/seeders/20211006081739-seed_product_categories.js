"use strict";

const categories = require("./categories.json");
const products = require("./products.json");
const db = require("../models");

const Product = db.Product;
const ProductCategory = db.ProductCategory;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     await queryInterface.bulkInsert('People', [{
    name: 'John Doe',
     isBetaMember: false
     }], {});
     */
    const Op = Sequelize.Op;

    const categoryIds = categories.map((category) => category.id);
    const productIds = products.map((product) => product.id);

    let existingCategories = await ProductCategory.findAll({
      where: {
        id: { [Op.in]: categoryIds },
      },
    });
    let existingProducts = await Product.findAll({
      where: {
        id: { [Op.in]: productIds },
      },
    });

    existingCategories = existingCategories.map((cat) => cat.id);
    existingProducts = existingProducts.map((cat) => cat.id);

    const existingCategoryIdsSet = new Set(existingCategories);
    const existingProductIdSet = new Set(existingProducts);

    const newCategories = categories.filter(
      (cat) => !existingCategoryIdsSet.has(cat.id)
    );

    const newProducts = products.filter(
      (product) => !existingProductIdSet.has(product.id)
    );

    if (newCategories.length) {
      console.log(`Adding ${newCategories.length} new categories`);
      await queryInterface.bulkInsert("ProductCategories", newCategories, {});
    }

    if (newProducts.length) {
      console.log(`Adding ${newProducts.length} new products`);

      await queryInterface.bulkInsert("Products", newProducts, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    const categoryIds = categories.map((category) => category.id);
    const productIds = products.map((product) => product.id);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(
      "ProductCategories",
      {
        where: {
          id: { [Op.in]: categoryIds },
        },
      },
      {}
    );

    await queryInterface.bulkDelete(
      "Products",
      {
        where: {
          id: { [Op.in]: productIds },
        },
      },
      {}
    );
  },
};

/*

- good environment
- a good camera
- a tripod the camera(or phone camera)
- small mics you can use
- think about the lighting. soft box to difuse the light
- the way you structure your content is is keus
- screen recording
- post production after you 

*/
