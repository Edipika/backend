'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('products', [
      {
        
        "category_id": 8,
        "name": "Onion",
        "description": "Onion enhances dishes with its savory taste, making it a staple ingredient for cooking and garnishing",
        "price": 49,
        
      },
      {
        
        "category_id": 8,
        "name": "Potato",
        "description": "Potatoes provide essential nutrients and comforting flavors! enjoy them baked, mashed, or fried for a satisfying meal that everyone will enjoy",
        "price": 51,
        
      },
      {
        
        "category_id": 9,
        "name": "Banana Robusta",
        "description": "Bananas are a staple in many diets for their versatility and nutrition",
        "price": 39,
        
      },
      {
        
        "category_id": 10,
        "name": "Jay white egg",
        "description": "Versatile white eggs, offering a neutral taste that complements both sweet and savory recipes",
        "price": 342,
        
      },
      {
        
        "category_id": 11,
        "name": "The Baker's Dozen 100% Whole Wheat Bread - No Palm Oil No Preservative",
        "description": "Hearty whole wheat bread with a dense, nutty texture and rich flavor, perfect for making filling sandwiches or enjoying as a nutritious breakfast",
        "price": 465,
        
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.dropTable('products');
  }
};


