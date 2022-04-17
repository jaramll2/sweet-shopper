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
    let cart;
    //if we send this route a cart id, it finds cart and 
    //returns it. if we don't, then it creates a cart and
    //returns it.
    if(req.body.cartId){
      cart = await Cart.findOne({
        where: {
          id: req.body.cartId
        },
        include: [{
          model: LineItem, include: [{
            model: Candy
          }]
        }]
      });
    }
    else{
      cart = await Cart.create({},{
        include: [{
          model: LineItem, include: [{
            model: Candy
          }]
        }]
      });
    }
    res.send(cart);
  }
  catch(err){
    next(err);
  }
})