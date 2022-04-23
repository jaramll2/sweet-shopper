import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../store/cart";

class Candy extends Component{
  constructor(){
    super();
    this.state = {
      qty: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(ev){
    ev.preventDefault();
    document.getElementById("addForm").reset();
  }

  onChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render(){
    const { qty } = this.state;
    const { onChange, onSubmit } = this;

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
        <form id='addForm' onSubmit={onSubmit}>
          <label>Quantity: </label>
          <input type='number' min='1' name='qty' onChange={ onChange }></input><br/>
          <button disabled = {!qty} onClick={()=> this.props.addToCart(candy, qty, this.props.auth, this.props.guestCart)}>Add To Cart</button>
        </form>
        
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch)  => {
  return{
    addToCart: (candy, qty, auth, guestCart)=>{
      dispatch(addToCart(candy, qty, auth, guestCart));
    }
  }
};

export default connect(state=>state, mapDispatchToProps)(Candy);
