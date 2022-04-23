import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { loadCart } from "../../store/cart"
import { deleteFromCart } from "../../store/guestCart"
import Confirmation from "../Confirmation/Confirmation";

class Cart extends Component{
  render(){
    //returns null for initial render
    if(!this.props.auth)
      return null;

    //renders guest cart if no user is logged in.
    let cart = !this.props.auth.id ? this.props.guestCart: this.props.auth.cart;

    //guest cart but it is empty
    if(!cart.lineitems){
      return;
    }

    let lineitems;

    if(!this.props.auth.id){
      lineitems = this.props.guestCart.lineitems;
    }
    else{
      lineitems = this.props.auth.cart.lineitems;
    }

    return(
      <div>
        <ul>
          {lineitems.map((lineitem) => {
            return <li key={lineitem.id}>
              {lineitem.candy.name} - qty: {lineitem.qty} - Total Price: ${lineitem.candy.price * lineitem.qty}
              <button onClick={() => this.props.deleteFromCart(lineitem.id, this.props.auth)}>Remove</button>
            </li>
          })}
        </ul>

        <div>
          <button onClick = { ()=>{
              const {history} = this.props;
              history.push('/confirmation');
              }}>
          Complete Order</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch)  => {
  return {
    deleteFromCart: (id, auth) => {
      dispatch(deleteFromCart(id, auth));
    }
  }
};


export default connect(state=>state, mapDispatchToProps)(Cart);
