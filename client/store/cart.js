import axios from 'axios';


const ADD_TO_CART = 'ADD_TO_CART';
const ADD_TO_CART_GUEST = 'ADD_TO_CART_GUEST';


export const addToCart = (candy,auth, guestCart)=>{
  return async(dispatch)=>{
    if(!window.localStorage.token && guestCart){
      let line;

      //if cart is not empty and has lineItems find line with candyId and update
      if(guestCart.lineitems){
        line = guestCart.lineitems.find(_line => {
          return _line.candyId === candy.id;
        });
      }

      //if no line item exist create one to add to cart
      if(!line){
        (await axios.post('/api/lineItem',{cartId:guestCart.id, qty: 1, candyId: candy.id})).data; 
      }
      else{
        //else update line item in cart 
        (await axios.put(`/api/lineItem/${line.id}`, {...line, ...{qty: line.qty + 1}}));
      }

      const updatedcart = (await axios.get(`/api/cart/${guestCart.id}`)).data ;
      guestCart.lineitems = updatedcart.lineitems;

      return dispatch({
        type: ADD_TO_CART_GUEST,
        guestCart
      })
    }
    else{
      const cart = auth.cart;

      //find line that has the candyId
      const line = cart.lineitems.find(_line => {
        return _line.candyId === candy.id;
      });

      //if no line item exist create one to add to cart
      if(!line){
        (await axios.post('/api/lineItem',{cartId:cart.id, qty: 1, candyId: candy.id})).data; 
      }
      else{
        //else update line item in cart 
        (await axios.put(`/api/lineItem/${line.id}`, {...line, ...{qty: line.qty + 1}}));
      }

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