import axios from 'axios';

const GUEST_CART = 'GUEST_CART';

export const guestCart = () => {
  return async(dispatch) => {
    try{
      let guestCart;

      //if we have a cart id saved in local storage, we fetch the cart.
      //if not, we create a cart and save it in local storage.
      let cartId = window.localStorage.cartId;

      if(!cartId){
        guestCart = (await axios.post('/api/cart', null,  {
          headers:{
            authorization: 'guest'
          }
        })).data;
        window.localStorage.cartId = guestCart.id;
      }
      else{
        
        guestCart = (await axios.get(`/api/cart/${cartId}`, {
          headers: {
            authorization: 'guest'
          }
        })).data;
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