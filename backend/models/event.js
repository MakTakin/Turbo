const Sequelize = require('sequelize')
const db = require('../database/database')
const Event = db.define('event', {
    name: {
        type: Sequelize.TEXT,
    }
}, {timestamps: false})

module.exports = Event