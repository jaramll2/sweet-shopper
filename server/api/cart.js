const router = require('express').Router();
const { models: {Cart, LineItem, Candy}} = require('../db');
const User = require('../db/models/User');
module.exports = router;

router.get('/', async (req, res, next) => {
  try{
    const user = await User.findByToken(req.headers.authorization);
    const cart = await Cart.findOne({
      include:[
        {model: LineItem, include: [Candy]}
      ],
      where: {
        userId: user.id
      }
    })
    res.send(cart);
  }
  catch(err){
    next(err);
  }
})