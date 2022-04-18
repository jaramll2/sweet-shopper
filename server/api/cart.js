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

router.get('/:id',async(req,res,next)=>{
  try{
    const cart = await Cart.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: LineItem, include: [{
          model: Candy
        }]
      }]
    });
    
    res.send(cart);
  }
  catch(err){
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try{
    const cart = await Cart.create({},{
      include: [{
        model: LineItem, include: [{
          model: Candy
        }]
      }]
    });

    res.send(cart);
  }
  catch(err){
    next(err);
  }
})