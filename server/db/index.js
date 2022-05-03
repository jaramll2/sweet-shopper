//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Candy = require('./models/Candy')
const LineItem = require('./models/LineItem');
const Cart = require('./models/Cart');
const Tag = require('./models/Tag');

Candy.belongsToMany(Tag, {through: 'CandyTags'});
Tag.belongsToMany(Candy, {through: 'CandyTags'});


User.hasOne(Cart);
Cart.belongsTo(User);
Cart.hasMany(LineItem);
LineItem.belongsTo(Cart);

Candy.hasMany(LineItem);
LineItem.belongsTo(Candy);

module.exports = {
  db,
  models: {
    User,
    Candy,
    LineItem,
    Cart,
    Tag
  },
}
