//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Candy = require('./models/Candy')
const LineItem = require('./models/LineItem');


Candy.hasMany(LineItem);
LineItem.belongsTo(Candy);

module.exports = {
  db,
  models: {
    User,
    Candy,
    LineItem
  },
}
