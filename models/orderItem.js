
module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            },
            onDelete: 'CASCADE'
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        sub_total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

    },
        {
            tableName: 'order_items',
            timestamps: true,
        });

    // Associations
    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
        OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
        // OrderItem.hasMany(models.OrderItemItem, { foreignKey: 'OrderItem_id', onDelete: 'CASCADE' });
    };

    return OrderItem;
};