const router = require('express').Router();
const { models: {Candy, User, Tag}} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try{
    res.send(await Tag.findAll())
  }
  catch(error){
    next(error);
  }
})