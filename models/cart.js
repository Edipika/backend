
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      references: {
        model: 'users',  
        key: 'id',  
      },
      onDelete: 'CASCADE', 
    },
    total_price: DataTypes.DECIMAL(10, 2),
    status: {
      type: DataTypes.STRING,
      allowNull: false,  // You can define possible statuses like 'active', 'completed'
    },
  }, 
  {
    tableName: 'carts',  
    timestamps: true,  
  });

  // Associations
  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  
  };

  return Cart;
};