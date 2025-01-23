'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('category', [
      {
        "name": "Grocery & Kitchen",
        "parent_id": null,
        "description": "Grocery & Kitchen",
        "image_path": null,
      },
      {
        "name": "Snacks & Drinks",
        "parent_id": null,
        "description": "Snacks & Drinks",
        "image_path": null,

      },
      {
        "name": "Fruits and Vegetables",
        "parent_id": 1,
        "description": "Fruits and Vegetables",
        "image_path": "/uploads/categories/3/fruits-and-veggies.webp",

      },
      {
        "name": "Dairy, Breads and Eggs",
        "parent_id": 1,
        "description": "Dairy, Breads and Eggs",
        "image_path": "/uploads/categories/4/dairy-breads.webp",

      },
      {
        "name": "Atta, Rice, Oil & Dals",
        "parent_id": 1,
        "description": "Atta, Rice, Oil & Dals",
        "image_path": "/uploads/categories/5/atta-dal-rice.webp",

      },
      {
        "name": "Tea, Coffee & More",
        "parent_id": 2,
        "description": "Tea, Coffee & More",
        "image_path": "/uploads/categories/6/tea-coffee-more.webp",

      },
      {
        "name": "Frozen Food",
        "parent_id": 2,
        "description": "Frozen Food",
        "image_path": "/uploads/categories/7/frozen-food.webp",

      },
      {
        "name": "Fresh Vegetables",
        "parent_id": 3,
        "description": "Fresh Vegetables",
        "image_path": "/uploads/categories/8/fresh-vegetables.webp",

      },
      {
        "name": "Fresh Fruits",
        "parent_id": 3,
        "description": "Fresh Fruits",
        "image_path": "/uploads/categories/9/fresh-fruits.webp",

      },
      {

        "name": "Eggs",
        "parent_id": 4,
        "description": "Eggs",
        "image_path": "/uploads/categories/10/eggs.webp",

      },
      {

        "name": "Breads & Buns",
        "parent_id": 4,
        "description": "Breads & Buns",
        "image_path": "/uploads/categories/11/dairy-breads.webp",

      },
      {

        "name": "Atta & Other Flours",
        "parent_id": 5,
        "description": "Atta & Other Flours",
        "image_path": "/uploads/categories/12/Atta-Other-Flours.webp",

      },
      {

        "name": "Coffee",
        "parent_id": 6,
        "description": "Coffee",
        "image_path": "/uploads/categories/13/coffee.webp",

      },
      {

        "name": "Veg Snacks",
        "parent_id": 7,
        "description": "Veg Snacks",
        "image_path": "/uploads/categories/14/veg-snacks.webp",

      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.dropTable('category');
  }
};
