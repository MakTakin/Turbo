const {Sequelize} = require('sequelize')

const db = new Sequelize('turbodb', 'postgres', 'ahjyn123', {
  dialect: 'postgres'
})



module.exports = db