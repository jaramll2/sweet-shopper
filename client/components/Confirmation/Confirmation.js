import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { completePurchase } from "../../store/cart"
import OrderSummary from "../OrderSummary/OrderSummary";

class Confirmation extends Component{
    constructor(props){
        super(props);
        this.state= JSON.parse(localStorage.getItem("state")) || { cart: null, username: ''};
    }

    componentDidMount(){
        console.log('confirmation mount');
        console.log(this.props);
        if(!this.props){
            return;
        }

        
        if(window.localStorage.token && !this.props.auth.cart || !window.localStorage.token && !this.props.guestCart){
            return;
        }

        if(window.localStorage.token && this.props.auth.cart.lineitems || !window.localStorage.token && this.props.guestCart.lineitems){
 
            if(this.state.username ===''){
                const stateProps = {
                    cart: !this.props? {} : (!window.localStorage.token ? this.props.guestCart : this.props.auth.cart),
                    username: !this.props ? '' : (!window.localStorage.token ? '!' : `, ${this.props.auth.username}!`)
                }
        
                localStorage.setItem("state", JSON.stringify(stateProps));
                this.setState(JSON.parse(localStorage.getItem("state")));
            }
            
            this.props.completePurchase(this.props.auth, this.props.guestCart);
        }
    }

    componentWillUnmount(){
        localStorage.removeItem("state");
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
            <div>
                <h1>Thank you for your purchase{ username }</h1>
                <OrderSummary cart = {cart} total = {total}/>
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
