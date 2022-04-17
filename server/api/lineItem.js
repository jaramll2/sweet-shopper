const router = require('express').Router();
const { models: {LineItem}} = require('../db');
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