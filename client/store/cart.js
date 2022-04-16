import axios from 'axios';

const LOAD_CART = 'LOAD_CART';

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


export default (state = {}, action) => {
  if(action.type === LOAD_CART){
    return action.cart;
  }
  return state;
}