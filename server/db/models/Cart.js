const Sequelize = require('sequelize')
const db = require('../db')


const Cart = db.define('cart', {
  isPurchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  date:{
    type: Sequelize.DATEONLY,
    defaultValue: new Date()
  },
  total:{
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.00
  }
});


module.exports = Cart;