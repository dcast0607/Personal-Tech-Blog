const { Model, Datatypes } = require('sequelize');

const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');

// TODO: Need to figure out a way to check passwords
class User extends Model {};

User.init({
    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[A-Za-z][A-Za-z0-9_]{2,16}$/i
        }
    },
    email: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },  
    password: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        }

    },
    name: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    hooks: {
        beforeCreate: async (newUser) => {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            return newUser;
        },
        beforeUpdate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
    },
    sequelize, 
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});

module.exports = User;