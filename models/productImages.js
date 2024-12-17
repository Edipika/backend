
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('ProductImage', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        image_path: {
            type: DataTypes.STRING,
            allowNull: true
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
        }
    }, {
        tableName: 'product_images',
        timestamps: false,
        freezeTableName: true
    });
    return Product;
}