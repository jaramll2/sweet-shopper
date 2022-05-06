import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

import Paper from "@mui/material/Paper";

import { completePurchase } from "../../store/cart"
import OrderSummary from "../OrderSummary/OrderSummary";

import "./Confirmation.scss";

class Confirmation extends Component{
    constructor(props){
        super(props);
        this.state={
            cart: !this.props? {} : (!window.localStorage.token ? this.props.guestCart : this.props.auth.cart),
            username: !this.props ? '' : (!window.localStorage.token ? '!' : `, ${this.props.auth.username}!`)
        }
    }

    componentDidMount(){
        if(!this.props){
            return;
        }
        
        this.props.completePurchase(this.props.auth,this.props.guestCart);
    }
    
    render(){
        const {cart,username} = this.state;

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


        return(
          <Paper elevation={3} className="confirmation">
            <div className="confirmation-container">
              <div className="confirmation-header">
                Thank you for your purchase{ username }
              </div>
              <div className="confirmation-body">
                <OrderSummary cart = {cart} total = {total}/>
              </div>
            </div>
          </Paper>
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
