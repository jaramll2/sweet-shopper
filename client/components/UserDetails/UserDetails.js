import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { Box, Modal } from "@mui/material";

import { modalStyle } from "../../utils";
import { editUserInfo } from "../../store/auth";

import "./UserDetails.scss";

class UserDetails extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      admin: this.props.user.admin,
      username: this.props.user.username,
      email:this.props.user.email,
      firstName:this.props.user.firstName,
      lastName:this.props.user.lastName,
      address: this.props.user.address,
      city: this.props.user.city,
      usState:this.props.user.usState,
      zipcode:this.props.user.zipcode
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt){
    if(evt.target.type === 'checkbox'){
      this.setState({
        admin: !this.state.admin
      })
    }
    else{
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
  }

  async handleSubmit(evt){
    console.log(evt.target.name);
    evt.preventDefault();
    await axios.put(`/auth/${this.props.user.id}`, this.state, {
      headers: {
        authorization: window.localStorage.token
      }
    })

    this.props.onClose()
  }

  render(){
    const { admin, username, firstName, lastName, email, address, city, usState, zipcode } = this.state;
    const { open, onClose, user } = this.props;
    return(
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <form className="user-details-form" onSubmit={this.handleSubmit}>
            <div className="input">
              <div className="label">Username: </div>
              <input value={username} name="username" onChange={this.handleChange}></input>
            </div>
            <div className="input">
              <div className="label">Email: </div>
              <input value={email} name="email" onChange={this.handleChange}></input>
            </div>
            <div className="input">
              <div className="label">First name: </div>
              <input value={firstName} name="firstName" onChange={this.handleChange}></input>
            </div>
            <div className="input">
              <div className="label">Last name: </div>
              <input value={lastName} name="lastName" onChange={this.handleChange}></input>
            </div>
            <div className="input">
              <div className="label">Address: </div>
              <input value={address} name="address" onChange={this.handleChange}></input>
            </div>
            <div className="input">
              <div className="label">City: </div>
              <input value={city} name="city" onChange={this.handleChange}></input>
            </div>
            <div className="input">
              <div className="label">State: </div>
              <input value={usState} name="usState" onChange={this.handleChange}></input>
            </div>
            <div className="input">
              <div className="label">Zipcode: </div>
              <input value={zipcode} name="zipcode" onChange={this.handleChange}></input>
            </div>
            <label>
              <input type="checkbox" 
                className="checkbox" 
                checked={admin} 
                onChange={this.handleChange} 
                disabled={user.id === this.props.auth.id ? true : false}
              />
              <span>Admin</span>
            </label>
            <button>Submit</button>
          </form>
        </Box>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editUserInfo: function (user) {
      return dispatch(editUserInfo(user));
    },
  };
};

export default connect(state => state, mapDispatchToProps)(UserDetails);
