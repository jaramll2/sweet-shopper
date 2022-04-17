import axios from 'axios';

const GUEST_CART = 'GUEST_CART';

export const guestCart = () => {
  return async(dispatch) => {
    try{
      let guestCart;
      let cartId = window.localStorage.cart;
      if(!cartId){
        guestCart = (await axios.post('/api/cart')).data;
        window.localStorage.cart = guestCart.id;
      }
      else{
        guestCart = (await axios.post('/api/cart', {cartId: window.localStorage.cart})).data
      }

      dispatch({
        type: GUEST_CART,
        guestCart
      })
    }
    catch(err){
      throw err;
    }
  }
}

export default(state = {}, action) => {
  if(action.type === GUEST_CART){
    return action.guestCart
  }
  return state
}