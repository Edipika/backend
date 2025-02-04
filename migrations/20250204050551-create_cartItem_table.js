'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carts',  // Foreign key referencing the Carts table
          key: 'id',
        },
        onDelete: 'CASCADE',  // Optional: Delete cart items when the cart is deleted
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',  // Assuming you have a Products table
          key: 'id',
        },
        onDelete: 'CASCADE',  // Optional: Delete cart items when the product is deleted
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price_at_purchase: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_items');
  }
};
