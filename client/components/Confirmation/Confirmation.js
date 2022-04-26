import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { completePurchase } from "../../store/cart"

class Confirmation extends Component{

    render(){
        //TODO: 
        //store cart in order history eventually
        //go back and ensure that if there are no line items (empty cart)
        //you cannot complete purcahse, thus cannot get to this page
        
        const cart = !window.localStorage.token ? this.props.guestCart : this.props.auth.cart;

        if(!cart){
            return;
        }

        const lines = cart.lineitems;

        if(!lines){
            return;
        }

        const total = lines.reduce((prev,curr)=>{
            let price = curr.candy.price * curr.qty * 1;
            return prev + price;
        },0);

        this.props.completePurchase(this.props.auth,cart);
        console.log(lines);

        return(
            <div>
                <h1>Thank you for your purchase{ !window.localStorage.token ? '!' : `, ${this.props.auth.username}!`}</h1>

                <h3>Order Summary</h3>
                
                {/* Eventually include image of candy */}

                {lines.map(line=>{
                    return (
                        <div key = {line.id}>
                            <span>
                                {line.candy.name} x {line.qty}
                            </span>
                            <span>
                                <br/>
                                Price: ${(line.qty * line.candy.price).toFixed(2)}
                                <br/>
                                <br/>
                            </span>
                        </div>
                    )
                })}

                <span><b>Total: </b>${total.toFixed(2)}</span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)  => {
    return{
        completePurchase: (auth,cart)=>{
        dispatch(completePurchase(auth,cart));
      }
    }
  };

export default connect(state=>state, mapDispatchToProps)(Confirmation);
