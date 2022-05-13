import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

import { completePurchase } from "../../store/cart"
import OrderSummary from "../OrderSummary/OrderSummary";
import { getGuestCart } from "../../store/guestCart";

import "./Confirmation.scss";

class Confirmation extends Component{
    constructor(props){
        super(props);
        this.state= JSON.parse(localStorage.getItem("state")) || { cart: null, username: ''};
    }

    componentDidMount(){
        if(!this.props){
            return;
        }

        if(window.localStorage.token){
            if(!this.props.auth.cart){
                return;
            }

            if(this.props.auth.cart.lineitems){
                if(this.state.username ===''){
                    const stateProps = {
                        cart: this.props.auth.cart,
                        username: `, ${this.props.auth.firstName}!`
                    }
            
                    localStorage.setItem("state", JSON.stringify(stateProps));
                    this.setState(JSON.parse(localStorage.getItem("state")));
                }
                
                this.props.completePurchase(this.props.auth, this.props.guestCart);
            }
        }
        else{
            if(!this.props.guestCart){
                return;
            }

            if(this.props.guestCart.lineitems){
                if(this.state.username ===''){
                    const stateProps = {
                        cart: this.props.guestCart,
                        username:'!'
                    }
            
                    localStorage.setItem("state", JSON.stringify(stateProps));
                    this.setState(JSON.parse(localStorage.getItem("state")));
                }
                
                this.props.completePurchase(this.props.auth, this.props.guestCart);
            }
        }
    }

    componentDidUpdate(prevProps){
        /*
        This code is janky and  exists soley to ensure the cart number gets updated for the logged in user
        upon checkout. because the confirmation component is not a child of the cart component, the set auth that
        is called from the confirmation component does not register until the cart icon is clicked. we need to
        do something that will trigger an update for  the cart icon without being clicked. getting the guest cart
        does just that and doesn't really have an effect on anything else going on
        */
        if(window.localStorage.token){
            if(prevProps.auth.cart){
                if(prevProps.auth.cart.id ===this.state.cart.id){
                     this.props.getGuestCart();
                }
            }   
        }
    }

    componentWillUnmount(){
        window.localStorage.removeItem("state");
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
                  <div className="order-date">{cart.date}</div>
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
                        <div className="details">{this.props.auth.address}</div>
                        <div className="details">{this.props.auth.city}, {this.props.auth.usState} {this.props.auth.zipcode}</div>
                      </div>
                      <div className="shipping-method">
                        <div className="title">Shipping method</div>
                        <div className="details">UPS Ground</div>
                      </div>
                    </div>
                    <div className="info-right">
                      <div className="billing-address">
                        <div className="title">Billing address</div>
                        <div className="details">{this.props.auth.address}</div>
                        <div className="details">{this.props.auth.city}, {this.props.auth.usState} {this.props.auth.zipcode}</div>
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
        },
        getGuestCart: ()=> {
            dispatch(getGuestCart());
          },
    }
  };

export default connect(state=>state, mapDispatchToProps)(Confirmation);
