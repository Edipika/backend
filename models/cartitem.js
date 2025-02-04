
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carts',  
        key: 'id',
      },
      onDelete: 'CASCADE',  
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',  
        key: 'id',
      },
      onDelete: 'CASCADE',  
    },
    quantity: DataTypes.INTEGER,
    price_at_purchase: DataTypes.DECIMAL
  },
  {
    tableName: 'cart_items', 
    timestamps: true,  
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
    CartItem.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });  // Define Foreign Key Relationship
  };

  return CartItem;
};