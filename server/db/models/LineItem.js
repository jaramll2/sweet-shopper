const { VIRTUAL } = require('sequelize');
const Sequelize = require('sequelize')
const db = require('../db')
const Candy = require('./Candy')

const LineItem = db.define('lineitem', {
  qty: {
    type: Sequelize.INTEGER,
    validate:{
      isPositive(value){
        if(value < 0){
          throw new Error('Line item can not have negative quantity');
        }
      }
    }
  }
  //TODO: maybe add virtual feild to add total of line item price.
})


module.exports = LineItem;