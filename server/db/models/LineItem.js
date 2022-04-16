const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineitem', {
  qty: {
    type: Sequelize.INTEGER
  }
})


module.exports = LineItem;