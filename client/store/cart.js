import axios from 'axios';

const LOAD_CART = 'LOAD_CART';
const ADD_TO_CART = 'ADD_TO_CART';

export const loadCart = () => {
  return async(dispatch) => {
    try{

      let cart = (await axios.get('/api/cart', {
        headers: {
          authorization: window.localStorage.token
        }
      })).data;
      dispatch({
        type: LOAD_CART,
        cart
      })
    }
    catch(err){
      let cart = window.localStorage.cart;
      
      //401 error means invalid user token was supplied, so user isn't logged in.
      //we create a cart if there's not one already, fetch the cart if there is.
      if((err.response.status === 401) && (!cart)){
        cart = (await axios.post('/api/cart')).data;
        window.localStorage.cart = cart.id;
      }
      else if((err.response.status === 401) && (cart)){
        cart = (await axios.post('/api/cart', {cartId: window.localStorage.cart})).data
      }
      else{
        throw err;
      }
      dispatch({
        type: LOAD_CART,
        cart
      })
    }
  }
}

export const addToCart = (candy,cart)=>{
  return async(dispatch)=>{
    //TODO
    //if cart is empty, create
    //after creating, create lineItem and add to cart
    //want to return cart to set as the new cart state


    //if cart exists get all line items with that cart number then search for line item with our candy #
    const lines = cart.lineitems;
    const line = lines.find(_line => {
      return _line.candyId === candy.id;
    })
    
    //TODO
    //if no line item exist create one to add to cart
    //else update line item in cart 
    const quanity = line.qty + 1;
    const updatedLineItem = (await axios.put(`/api/lineItem/${line.id}`, {...line, ...{qty: quanity}})).data;

    dispatch({
      type: ADD_TO_CART,
      cart
    })
  }
};

export default (state = {}, action) => {
  if(action.type === LOAD_CART){
    return action.cart;
  }
  if(action.type === ADD_TO_CART){
    return action.cart;
  }

  return state;
}