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
    await queryInterface.bulkInsert('product_images', [
      {
        
        "product_id": 1,
        "image_path": "uploads/products/1/onions.webp",
       
      },
      {
        
        "product_id": 2,
        "image_path": "uploads/products/2/potato.webp",
       
      },
      {
        
        "product_id": 3,
        "image_path": "uploads/products/3/Banana.webp",
       
      },
      {
        
        "product_id": 4,
        "image_path": "uploads/products/4/egg-product.webp",
       
      },
      {
        
        "product_id": 5,
        "image_path": "uploads/products/5/bread-product.webp",
       
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
    await queryInterface.dropTable('product_images');
  }
};
