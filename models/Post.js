const { Model, Datatypes } = require('sequelize');

const sequelize = require('../config/connection');

class Post extends Model {};

Post.init({
    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    post_title: {
        type: Datatypes.String,
        allowNull: false,
    },
    post_body: {
        type: Datatypes.String,
        allowNull: false,
    },
    created_at: {
        type: Datatypes.Date,
        allowNull: false,
        defaultValue: Datatypes.NOW,
    },
    user_id: {
        type: Datatypes.Integer,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'post',
});