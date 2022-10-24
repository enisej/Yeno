const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')


const tests = sequelize.define('tests', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    title: {type: DataTypes.STRING, allowNull: false },
    link: {type: DataTypes.STRING, allowNull: false, unique: true },
    description: {type: DataTypes.TEXT, allowNull: false},
    responseLink: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
}, {
    timestamps: false
})

module.exports = {
    tests
}