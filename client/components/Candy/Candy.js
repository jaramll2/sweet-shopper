import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../store/cart";

class Candy extends Component{

  render(){
    //filter through candies until we find the one that matches the id in the url
    const candy = this.props.candies.find((candy) => candy.id === this.props.match.params.id * 1)

    //return null if we don't find candy for the initial render.
    if(!candy)
      return null;

    return(
      <div>
        <h3>{candy.name}</h3>
        <div>Weight: {candy.weight}</div>
        <div>Price: ${candy.price}</div>
        <button onClick={this.props.addToCart(candy, this.props.cart)}>Add To Cart</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch)  => {
  return{
    addToCart: (candy, cart)=>{
      dispatch(addToCart(candy,cart));
    }
  }
};

export default connect(state=>state,mapDispatchToProps)(Candy);
