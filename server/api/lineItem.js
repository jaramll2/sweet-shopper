const router = require('express').Router();
const { route } = require('express/lib/application');
const { models: {LineItem, Cart, Candy}} = require('../db');
module.exports = router;

router.put('/:id', async(req,res,next)=>{
    try{
        const line = await LineItem.findByPk(req.params.id);
        res.send(await line.update(req.body));
    }
    catch(err){
        next(err);
    }
});

router.post('/', async(req,res,next)=>{
    try{
        const newLine = await LineItem.create({...req.body});
        res.status(201).send(newLine);
    }
    catch(err){
        next(err);
    }
});

router.delete('/:id', async (req, res, next ) => {
    try {
        const lineItem = await LineItem.findByPk(req.params.id);
        await lineItem.destroy()
        console.log(lineItem.candyId)
        const cart = await Cart.findOne({
            where: {
              id: lineItem.cartId
            },
            include: [{
              model: LineItem, include: [{
                model: Candy
              }]
            }]
          })
          console.log('cart from axios', cart)
        res.send(cart)
        
    }
    catch (err) {
        console.log(err)
    }
})
