import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import CartItem from "../CartItem";

import "./Cart.scss";

class Cart extends Component {
  state = {
    cartOpen: false,
  };

  toggleCart = () => {
    this.setState((prev) => ({ cartOpen: !prev.cartOpen }));
  };

  render() {
    const { cartOpen } = this.state;
    const items = this.props.auth.cart?.lineitems || this.props.guestCart.lineitems || [];
    const subtotalMessage = `Subtotal (${items.length} item${items.length > 1 ? "s" : ""})`;
    const totalPrice =
      items.length > 0 ? items.reduce((total, item) => total + item.candy.price * item.qty, 0) : 0;

    return (
      <>
        <ShoppingCartIcon
          fontSize="large"
          className="navbar-icon shopping-cart"
          onClick={this.toggleCart}
        />
        <Drawer anchor="right" open={cartOpen} onClose={this.toggleCart} transitionDuration={400}>
          <Box sx={{ width: 400, padding: "10px 20px" }} role="presentation">
            <div className="cart-body">
              <h3>Your Cart</h3>
              <div className="cart-items">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <div className="cart-subtotal">
                <span className="cart-subtotal-label">{subtotalMessage}</span>
                <span className="cart-subtotal-value">${totalPrice.toFixed(2)}</span>
              </div>
              <Link to="/confirmation">
                <button className="cart-checkout-button" onClick={this.toggleCart}>
                  Continue to Checkout
                </button>
              </Link>
            </div>
          </Box>
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Cart);
