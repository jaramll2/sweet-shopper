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
    if (err.status === 401){
      res.sendStatus(401);
    }
    else
      next(err);
  }
})


router.post('/', async (req, res, next) => {
  try{
    let cart
    if(req.body.cartId){
      cart = await Cart.findByPk(req.body.cartId)
    }
    else{
      cart = await Cart.create();
    }
    res.send(cart);
  }
  catch(err){
    next(err);
  }
})