import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import EditAccount from "../EditAccount";
import EditShippingAddress from "../EditShippingAddress";
import OrderHistory from "../OrderHistory";

import "./AccountPage.scss";

class AccountPage extends Component {
  constructor() {
    super();
    this.state = {
      accountModalOpen: false,
      shippingModalOpen: false,
    };
  }

  toggleAccountModal = () => {
    this.setState({
      accountModalOpen: !this.state.accountModalOpen,
    });
  };

  toggleShippingModal = () => {
    this.setState({
      shippingModalOpen: !this.state.shippingModalOpen,
    });
  };

  render() {
    const { username, firstName, lastName, email, address, city, usState, zipcode} = this.props.auth;
    const { accountModalOpen, shippingModalOpen } = this.state;
    
    if(!window.localStorage.token){
      this.props.history.push('/');
    }

    if(!firstName){
      return;
    }

    return (
      <div className="account-page">
        <div className="account-container">
          <h3>Hello, {firstName.substring(0,1).toUpperCase() + firstName.substring(1).toLowerCase()}!</h3>
          <div>
            {this.props.auth.id && (
              <>
                <EditAccount toggleModal={this.toggleAccountModal} open={accountModalOpen} />
                <EditShippingAddress
                  toggleModal={this.toggleShippingModal}
                  open={shippingModalOpen}
                />
              </>
            )}
            <div className="paper-container">
              <Paper elevation={3} style={{ margin: "30px", borderRadius: "10px", width: "400px" }}>
                <div className="profile-container">
                  <div className="profile">
                    <h2>Account Details</h2>
                    <ModeEditOutlineOutlinedIcon onClick={this.toggleAccountModal} />
                  </div>
                  <div>
                    <span className="label">Username</span>
                    <span>{username}</span>
                  </div>
                  <div>
                    <span className="label">Email</span>
                    <span>{email}</span>
                  </div>
                  <div>
                    <span className="label">First Name</span>
                    <span>{firstName}</span>
                  </div>
                  <div>
                    <span className="label">Last Name</span>
                    <span>{lastName}</span>
                  </div>
                </div>
              </Paper>
              <Paper elevation={3} style={{ margin: "30px", borderRadius: "10px", width: "400px" }}>
                <div className="shipping-address-container">
                  <div className="shipping-address">
                    <h2>Shipping Address</h2>
                    <ModeEditOutlineOutlinedIcon onClick={this.toggleShippingModal} />
                  </div>
                  <div className="address">
                    <span className="label">Address</span>
                    <span className="input-address">{address}</span>
                  </div>
                  <div className="address">
                    <span className="label">City</span>
                    <span className="input-address">{city}</span>
                  </div>
                  <div className="address">
                    <span className="label">State</span>
                    <span className="input-address">{usState}</span>
                  </div>
                  <div className="address">
                    <span className="label">Zip Code</span>
                    <span className="input-address">{zipcode}</span>
                  </div>
                </div>
              </Paper>
              <Paper elevation={3} style={{ margin: "30px", borderRadius: "10px", width: "400px" }}>
                <div className="payment-methods-container">
                  <div className="payment-methods">
                    <h2>Payment Methods</h2>
                    <ModeEditOutlineOutlinedIcon />
                  </div>
                  <div>
                    <CreditCardIcon style={{ fontSize: 30, color: "#949191" }} />
                    <span>**** **** **** 1234</span>
                  </div>
                  <div>
                    <span className="label">Card Holder</span>
                    <span></span>
                  </div>
                  <div>
                    <span className="label">Expire</span>
                    <span></span>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
        <div className="order-history-container">
          <OrderHistory />
        </div>
      </div>
    );
  }
}

export default connect((state) => state)(AccountPage);
