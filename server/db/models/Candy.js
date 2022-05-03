const Sequelize = require('sequelize');
const db = require('../db');
const Tag = require('./Tag');

const Candy = db.define('candy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    //add this back in after we have a better way to seed.
    // unique: true,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Candy name cannot be empty'
      }
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Candy must have a price'
      }
    }
  },
  weight: {
    type: Sequelize.STRING
  }
})

Candy.generateRandom = () => {

  // This is the beginning of an idea to create random candy names. It works right now, but I need to add more 
  // variety so that we don't get a bunch of repeats
  const prefixes = [
    'Coco',
    'Super',
    'Butter',
    'Frutti',
    'Crazy',
    'Cosmo',
    'Shiny',
    'Apple',
    'Pear',
    'Plum',
    'Choco',
    'Dyna',
    'Astro',
    'Yummy'
  
  ]
  
  const candy = [
    'jellies',
    'bubbles',
    'pops',
    'bursts',
    'strings',
    'ropes',
    'ploops',
    'kisses',
    'aroos',
    'doodles',
    'blooper',
    'blob',
    'poppers',
    'buttons',
    'lumps'
    
  ]
  
  const adjective = [
    'Tasty',
    'Delicious',
    'Fruity',
    'Cookie',
    'Cakey',
    'Lite',
    'Sugary',
    'Scrumptious',
    'Glazed',
    'Bursting',
    'Exploding',
    'Hard',
    'Soft',
    
  ]
const randomName = 
  `${adjective[Math.floor(Math.random() * adjective.length)]} ${prefixes[Math.floor(Math.random() * prefixes.length)]}${candy[Math.floor(Math.random() * candy.length)]}`


  return Candy.create({
    name: randomName,
    price: Math.floor(Math.random() * 8) + Math.random(),
    weight: '16oz'
  })
}

Candy.addTag = async (tagId) => {
  const tag = await Tag.findByPk(tagId);
  this.addTag(tag, {through: 'CandyTags'})
}

module.exports = Candy ;