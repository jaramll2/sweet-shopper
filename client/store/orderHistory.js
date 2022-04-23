import axios from 'axios';

export const addToOrderHistory = (auth)=>{
    return async(dispatch)=>{
        console.log('TEST');

        // DO STUFF HERE
        auth.orderHistory = [];
        
        return dispatch({
            type: "SET_AUTH",
            auth
          })
    }
}