import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { loadCart } from "../store/cart"

class Cart extends Component{

  async componentDidMount(){
    await this.props.loadCart();
  }

  render(){
    const { lineitems } = this.props.cart;
    if(!lineitems)
      return null;

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

const mapDispatchToProps = (dispatch)  => {
  return{
    loadCart: function(){
      dispatch(loadCart());
    }
  }
}

export default connect(state => state, mapDispatchToProps)(Cart);