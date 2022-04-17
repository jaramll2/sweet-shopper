import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { loadCart } from "../store/cart"

class Cart extends Component{


  render(){
    //returns null for initial render
    if(!this.props.auth)
      return null;

    //renders guest cart if no user is logged in.
    let lineitems
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
              {lineitem.candy.name} - qty: {lineitem.qty}
              <button>x</button>
            </li>
          })}
        </ul>
      </div>
    )
  }
}


export default connect(state=>state)(Cart);