import React, { Component } from "react";
import { connect } from "react-redux";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import OrderHistory from "../OrderHistory/OrderHistory";
import EditForm from "./EditForm";

import './AccountPage.scss';

class AccountPage extends Component{
  constructor(){
    super();
    this.state = {
      updateView: false,
      editModalOpen: false
    }

    this.doneUpdating = this.doneUpdating.bind(this);
  }

  doneUpdating(){
    this.setState({
      updateView: false
    })
  }

  render(){
    const { username, firstName, lastName, email } = this.props.auth;
    const { updateView } = this.state
    return(
      <div className="body">
        <h3>Account</h3>
        <div className="account-container">
          {updateView ? <EditForm doneUpdating={this.doneUpdating} open={updateView}/>  :
             <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 1,
                    width: 500,
                    height: 400,
                  },
                }}
              >
                <Paper 
                  elevation={3}
                  style={{margin: '30px', borderRadius: '10px'}}
                >
                  <div className="profile-container">
                    <div className="profile">
                      <h2>Account Details</h2>
                      <ModeEditOutlineOutlinedIcon />
                    </div>
                    <div>
                      <span className="title">Username</span>
                      <span>{username}</span>
                    </div>
                    <div>
                      <span className="title">Email</span> 
                      <span>{email}</span>
                    </div>
                    <div>
                      <span className="title">First Name</span> 
                      <span>{firstName}</span>
                    </div>
                    <div>
                      <span className="title">Last Name</span> 
                      <span>{lastName}</span>
                    </div>
                    <button onClick={() => this.setState({updateView: true})}>Edit Info</button>
                  </div>
                </Paper>
                <Paper 
                  elevation={3}
                  style={{margin: '30px', borderRadius: '10px'}}
                >
                  <div className="shopping-address-container">
                    <div className="shopping-address">
                      <h2>Shipping Address</h2>
                      <ModeEditOutlineOutlinedIcon />
                    </div>
                    <div>
                      <span className="title">Address</span>
                      <span></span>
                    </div>
                    <div>
                      <span className="title">City</span>
                      <span></span>
                    </div>
                    <div>
                      <span className="title">State</span>
                      <span></span>
                    </div>
                    <div>
                      <span className="title">Zip Code</span>
                      <span></span>
                    </div>
                  </div>
                </Paper>
                <Paper
                  elevation={3}
                  style={{margin: '30px', borderRadius: '10px'}}
                >
                  <div className="payment-methods-container">
                    <div className="payment-methods">
                      <h2>Payment Methods</h2>
                      <ModeEditOutlineOutlinedIcon />
                    </div>
                    <div>
                      <CreditCardIcon 
                        style={{fontSize: 40, color: '#949191'}}
                      />
                      <span>**** **** **** 1234</span>
                    </div>
                    <div>
                      <span className="title">Card Holder</span>
                      <span></span>
                    </div>
                    <div>
                      <span className="title">Expire</span>
                      <span></span>
                    </div>
                  </div>
                </Paper>
              </Box>
            }
        </div>
        <div className="order-history-container">
          <OrderHistory/>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(AccountPage);
