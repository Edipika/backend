
module.exports = (sequelize, DataTypes) => {
    const RefreshTokens = sequelize.define('RefreshTokens', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'refresh_tokens',
        timestamps: false,
        freezeTableName: true
    });
    return RefreshTokens;
}