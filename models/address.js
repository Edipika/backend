
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
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
    tableName: 'address',  
    timestamps: true,  
  });

  // Associations
  Address.associate = (models) => {
    Address.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    // Address.hasMany(models.AddressItem, { foreignKey: 'Address_id', onDelete: 'CASCADE' });
  };

  return Address;
};