import { WindowSharp } from '@mui/icons-material';
import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const ADD_TO_CART_GUEST = 'ADD_TO_CART_GUEST';

export const addToCart = (candy, qty, auth, guestCart)=>{
  console.log('test');
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
          authorization: 'guest'
        }
      })).data ;
      guestCart.lineitems = updatedcart.lineitems;

      dispatch({
        type: "GUEST_CART",
        guestCart
      })
      return dispatch({
        type: "TOGGLE_CART"
      })
    }
    else{
      const updatedcart = (await axios.get('/api/cart/',{headers: {authorization: window.localStorage.token}})).data ;
      auth.cart = updatedcart;

      dispatch({
        type: "SET_AUTH",
        auth
      })
      return dispatch({
        type: "TOGGLE_CART"
      })

    }
  }
};

export const updateItem = (item) => async (dispatch, getState) => {
  const store = getState();
  const { auth, guestCart } = store;
  await axios.put(`/api/lineItem/${item.id}`, item , {
    headers: {
      authorization: window.localStorage.token
    }
  });
  const cart = auth.cart || guestCart;
  const updatedCart = {
    ...cart,
    lineitems: cart.lineitems.map(prev => prev.id === item.id ? item : prev)
  };
  if (auth.cart) {
    dispatch({ type: "SET_AUTH", auth: { ...auth, cart: updatedCart }});
  } else {
    dispatch({ type: "GUEST_CART", guestCart: updatedCart });
  }
};


