const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');

// TODO: Need to figure out a way to check passwords

// Reference: https://www.npmjs.com/package/bcrypt
/*
compareSync(data, encrypted)
data - [REQUIRED] - data to compare.
encrypted - [REQUIRED] - data to be compared to.
*/

class User extends Model {
    checkUserPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    };
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[A-Za-z][A-Za-z0-9_]{2,16}$/i
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },  
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        }

    },
    name: {
        type: DataTypes.STRING,
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