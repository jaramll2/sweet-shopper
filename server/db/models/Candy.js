const Sequelize = require('sequelize');
const db = require('../db');

const Candy = db.define('candy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    //add this back in after we have a better way to seed.
    // unique: true,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
    'Bubblegum Taffy',
    'Wild Cremes',
    'Gooey Blueberry Cremes',
    'Globlackberries',
    'Cosmobrittle Popcorn',
    'Marshmallow Scrunchies',
    'Swiss Minty Toffee',
    'Frutti Sinful Fudge',
    'Fruttisparkling Blackberries',
    'Marzipan Apricots',
    'Butterbutterscotch Toffee',
    'Lite Marshmallow Berries',
    'Sinful Glotoffee',
    'Superjunior Pecans',
    'Tastylite Apricots',
    'Cocosuckers',
    'Nutty Banana Blasts',
    'Frosty Boomchocolates',
    'Coacodark Bananas'
  ]

  return Candy.create({
    name: randomName[Math.floor(Math.random() * randomName.length)],
    price: Math.floor(Math.random() * 8) + Math.random(),
    weight: '16oz'
  })
}

module.exports = Candy ;