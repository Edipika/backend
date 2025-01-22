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
      // //1st cateory level 
      // {
      //   name: 'Grocery and Kitchen',
      //   parent_id: '',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Snacks and Drinks',
      //   parent_id: '',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Beauty and Personal care',
      //   parent_id: '',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Household Essentials',
      //   parent_id: '',
      //   description: '',
      //   image_path: '',
      // },
      // //category belongs to Grocery and Kitchen
      // {
      //   name: 'Fruits and Vegetables',
      //   parent_id: '1',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Dairy, Breads and Eggs',
      //   parent_id: '1',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Atta, Rice, Oil & Dals',
      //   parent_id: '1',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Meats, Fish & Eggs',
      //   parent_id: '1',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Masala, Dry Fruits & More',
      //   parent_id: '1',
      //   description: '',
      //   image_path: '',
      // },
      // //category belongs to Snacks and Drinks
      // {
      //   name: 'Tea, Coffee & More',
      //   parent_id: '2',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Ice Creams & More',
      //   parent_id: '2',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Frozen Food',
      //   parent_id: '2',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Sweet Cravings',
      //   parent_id: '2',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Cold Drinks & Juices',
      //   parent_id: '2',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Munchies',
      //   parent_id: '2',
      //   description: '',
      //   image_path: '',
      // },
      // //category belongs to Beauty and Personal care
      // {
      //   name: 'Skincare',
      //   parent_id: '3',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Baby Care',
      //   parent_id: '3',
      //   description: '',
      //   image_path: '',
      // },
      // {
      //   name: 'Bath & Body',
      //   parent_id: '3',
      //   description: '',
      //   image_path: '',
      // },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
