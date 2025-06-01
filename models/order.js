
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
        defaultValue: 'pending'
      },
      shipping_address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     
  }, 
  {
    tableName: 'orders',  
    timestamps: true,  
  });

  // Associations
  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    
    // Order.hasMany(models.OrderItem, { foreignKey: 'Order_id', onDelete: 'CASCADE' });
  };

  return Order;
};