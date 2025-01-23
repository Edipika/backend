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
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true, // Allow null for top-level categories with no parent
            references: {
                model: 'category', // Name of the table this column references
                key: 'id',          // Column in the referenced table
            },
            onUpdate: 'CASCADE',   // Update the parent_id if the referenced id changes
            onDelete: 'SET NULL',  // Set parent_id to null if the parent is deleted
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
