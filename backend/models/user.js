const Sequelize = require('sequelize')
const db = require('../database/database')
const Log = require('./log')
const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.TEXT,
    },
    firstname: {
        type: Sequelize.TEXT,
    },
    lastname: {
        type: Sequelize.TEXT,
    }
}, {timestamps: false})


User.Log = User.hasMany(Log, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = User