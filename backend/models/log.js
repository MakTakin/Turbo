const Sequelize = require('sequelize')
const db = require('../database/database')
const Event = require('./event')
const User = require('./user')
const Log = db.define('log', {
    event_id: {
        type: Sequelize.TEXT,
        unique: true
    },
    event_time: {
        type: Sequelize.DATE,

    }
}, {timestamps: false})



Log.Event = Log.hasOne(Event, {
    foreignKey: 'event_id',
    sourceKey: 'event_id',
    onDelete: 'CASCADE'
})


module.exports = Log
