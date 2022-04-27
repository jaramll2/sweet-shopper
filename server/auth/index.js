const router = require("express").Router();
const {
  models: { User, Cart, LineItem },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    
    const { username, password, guestCart } = req.body;

    //This block of code finds the user's cart, and the guest cart they were using,
    //then emptys the guest cart into the user's cart.
    const token = await User.authenticate({username, password});
    const user = await User.findByToken(token);
    
    console.log('IN LOGIN');
    console.log(token);
    console.log(user);

    const userCart = await Cart.findOne({
      where:{
        userId: user.id,
        isPurchased: false
      }
    })
    const guestCartToEmpty = await Cart.findOne({
      where: {
        id: guestCart,
        isPurchased: false
      },
      include: [LineItem]
    })
    guestCartToEmpty?.dataValues.lineitems.forEach(async(lineItem) => {
      
      lineItem.update({
        cartId: userCart.id
      })
      
    })
    
    res.send({ token });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password, guestCart, firstName, lastName, email } = req.body;
    const user = await User.create({username, password, firstName, lastName, email});
    await Cart.create({ userId: user.id });
    
    //This block of code finds the user's cart, and the guest cart they were using,
    //then emptys the guest cart into the user's cart.
    const userCart = await Cart.findOne({
      where:{
        userId: user.id
      }
    });
    const guestCartToEmpty = await Cart.findOne({
      where: {
        id: guestCart
      },
      include: [LineItem]
    });
    guestCartToEmpty?.dataValues.lineitems.forEach(async(lineItem) => {
      
      lineItem.update({
        cartId: userCart.id
      })
      
    })


    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
