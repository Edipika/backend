module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        // Define your model attributes here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
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
        timestamps: false,
        tableName: 'category',      // Explicitly specify the table name
        freezeTableName: true       // Disable pluralization
      });
    
      return Category;
    };
