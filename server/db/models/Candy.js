const Sequelize = require('sequelize');
const db = require('../db');

const Candy = db.define('candy', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  weight: {
    type: Sequelize.STRING
  }
})

Candy.generateRandom = () => {
  //List of possible random names. Could use an api later.
  const randomName = [
    'Plum Cocobites',
    'Grape Wild Popcorn',
    'Grape Bananas',
    'Junior Toffee',
    'Blueberry Crackochocolates',
    'Bubblegum Taffy'
  ]

  return Candy.create({
    name: randomName[Math.floor(Math.random() * 6)],
    price: Math.floor(Math.random() * 8) + Math.random(),
    weight: '16oz'
  })
}

module.exports = Candy ;