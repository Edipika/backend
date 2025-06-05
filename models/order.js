module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "processing", "completed", "cancelled"),
        defaultValue: "pending",
      },
      address_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name_on_card: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiry_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cvv: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "orders",
      timestamps: false,
    }
  );

  // Associations
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    Order.hasMany(models.OrderItem, {
      as: "order_items",
      foreignKey: "order_id",
    });
    Order.belongsTo(models.Address, {
      foreignKey: "address_id",
      as: "address",
    });
  };
  // Order.belongsTo(models.Address, {foreignKey: 'address_id' });
  // Order.hasOne(models.Address, { as: 'address', foreignKey: 'address_id' });

  return Order;
};

