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
  },
  imageUrl:{
    type: Sequelize.STRING,
    defaultValue: 'https://www.rebeccas.com/mm5/graphics/00000001/cn134.jpg'
  }
})

Candy.generateRandom = () => {

  
  //have to manually type these in for now, there's probably a better way
  const possiblePictures = [
    // '/caramel-img.jpeg',
    // '/chocolate.jpeg',
    // '/gummy.jpeg',
    // '/heart_candy.jpeg',
    // '/pink_lollipop.jpeg',
    // '/pink_heart_candy.jpg',
    // '/red_lollipop.jpeg',
    '/hard_candy.jpeg',
    '/swirl.jpeg',
    "/Image/coke-gummy.jpeg",
    "/Image/colorful-candy.jpeg",
    "/Image/egg-gummy.jpeg",
    "/Image/sour-green-apple-rings.jpeg",
    "/Image/sour-rings.jpeg",
    "/Image/peppermint-candy.jpeg",
    "/Image/heart-gummy.jpeg",
    "/Image/sea-salt-caramel.jpeg",
    "/Image/soft-caramel.jpeg",
    "/Image/lollipop-candy.webp",
    "/Image/banana-gummy.jpg",
    "/Image/pineapple-gummy.jpeg",
    "/Image/orange-lemon-gummy.jpeg",
    "/Image/dark-chocolate.jpeg",
  ]


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
    weight: '16oz',
    imageUrl: possiblePictures[Math.floor(Math.random() * possiblePictures.length)]
  })
}

Candy.addTag = async (tagId) => {
  const tag = await Tag.findByPk(tagId);
  this.addTag(tag, {through: 'CandyTags'})
}

module.exports = Candy ;
