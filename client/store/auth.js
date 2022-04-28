import axios from 'axios';
import history from '../history';
import { emptyCart } from './guestCart';

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method, firstName, lastName, email) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password, guestCart: window.localStorage.cartId, firstName, lastName, email})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(emptyCart());
    return dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  //TODO
  //revisit situation in which cart id would need to be removed from local storage
  //when a user is a guest shopping and then logs in the guest cart is now that user cart
  //after the user logs out the once guest cart should no longer exist in local storage
  //would then need to figure out how to reload a guest cart
  //window.localStorage.removeItem('cartId');

  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
