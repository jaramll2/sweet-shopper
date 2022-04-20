import { WindowSharp } from '@mui/icons-material';
import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const ADD_TO_CART_GUEST = 'ADD_TO_CART_GUEST';

export const addToCart = (candy, qty, auth, guestCart)=>{
  return async(dispatch)=>{
    qty = parseInt(qty);

    const cart = (!window.localStorage.token && guestCart) ? guestCart : auth.cart;

    let line = (!cart.lineitems) ? null : cart.lineitems.find(_line => {
      return _line.candyId === candy.id;
    });

    //if no line item exist create one to add to cart
    if(!line){
      (await axios.post('/api/lineItem',{cartId:cart.id, qty: qty, candyId: candy.id}, {
        headers: {
          authorization: window.localStorage.token
        }
      })).data; 
    }
    else{
      //else update line item in cart 
      (await axios.put(`/api/lineItem/${line.id}`, {...line, ...{qty: line.qty + qty}},{
        headers: {
          authorization: window.localStorage.token
        }
      }));
    }

    if(!window.localStorage.token && guestCart){
      const updatedcart = (await axios.get(`/api/cart/${cart.id}`, {
        headers:{
          authorization: window.localStorage.token
        }
      })).data ;
      guestCart.lineitems = updatedcart.lineitems;

      return dispatch({
        type: ADD_TO_CART_GUEST,
        guestCart
      })
    }
    else{
      const updatedcart = (await axios.get('/api/cart/',{headers: {authorization: window.localStorage.token}})).data ;
      auth.cart = updatedcart;

      return dispatch({
        type: ADD_TO_CART,
        auth
      })
    }
  }
};

export default (state = {}, action) => {
  if(action.type === ADD_TO_CART){
    return action.auth; 
  }
  if(action.type === ADD_TO_CART_GUEST){
    return action.guestCart;
  }
  return state;
}