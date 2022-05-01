const router = require('express').Router();
const { models: {Candy, User}} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try{
    const candy = await Candy.findAll();
    res.send(candy);
  }
  catch(err){
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
  try{ 
    console.log(req.headers.authorization)
    const user = await User.findByToken(req.headers.authorization);
    
    //only admins can modify product info
    if(!user.admin)
      res.sendStatus(401);
    else{
      const candy = await Candy.findByPk(req.params.id);
      candy.name = req.body.name;
      candy.price = req.body.price;
      candy.weight = req.body.weight;
      await candy.save();
      res.sendStatus(204);
    }

    
  }
  catch(err){
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try{
    const user = await User.findByToken(req.headers.authorization)

    //only admins can create new product
    if(!user.admin)
      res.sendStatus(401);

    await Candy.create({name: req.body.name, price: req.body.price, weight: req.body.weight})
    
    res.sendStatus(201);
  }
  catch(err){
    next(err);
  }
})

router.delete('/:id', async (req, res, next) => {
  try { 
    const user = await User.findByToken(req.headers.authorization);
    
    //only admins can delete a product
    if(!user.admin)
      res.sendStatus(401);

    const candy = await Candy.findByPk(req.params.id);
    await candy.destroy();
    res.sendStatus(204);
  }
  catch(err){
    next(err);
  }
})