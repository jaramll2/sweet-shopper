import axios from 'axios';

const LOAD_CART = 'LOAD_CART';

export const loadCart = () => {
  return async(dispatch) => {
    try{
      const cart = (await axios.get('/api/cart', {
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
      //if we get an error, it means user isn't logged in, so we set the cart to empty.
      //will need to be changed when we add cart for non-logged in user.
      dispatch({
        type: LOAD_CART,
        cart: {}
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