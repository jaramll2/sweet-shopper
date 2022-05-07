import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

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
        const { order } = this.props;

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
          <div className="confirmation">
            <div className="confirmation-container">
              <div className="sidebar-left"></div>
              <div className="body">
                <div className="confirmation-header">
                  <div className="shop-name">Sweet Shopper</div>
                  <div className="text">Thank you for your purchase{ username }</div>
                  <div className="order-number">Order#</div>
                  <div className="order-date">date</div>
                </div>
                <div className="confirmation-body">
                  <hr />
                  <OrderSummary cart = {cart} total = {total}/>
                  <hr />
                </div>
                <div className="customer-info">
                  <h3>Customer Information</h3>
                  <div className="customer-info-body">
                    <div className="info-left">
                      <div className="shipping-address">
                        <div className="title">Shipping address</div>
                        <div className="details">address</div>
                      </div>
                      <div className="shipping-method">
                        <div className="title">Shipping method</div>
                        <div className="details">UPS Ground</div>
                      </div>
                    </div>
                    <div className="info-right">
                      <div className="billing-address">
                        <div className="title">Billing address</div>
                        <div className="details">address</div>
                      </div>
                      <div className="payment-method">
                        <div className="title">Payment method</div>
                        <div className="details">Credit Card</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sidebar-right"></div>
            </div>
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
