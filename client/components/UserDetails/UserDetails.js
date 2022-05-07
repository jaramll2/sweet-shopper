import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { Box, Modal } from "@mui/material";

import { modalStyle } from "../../utils";

import "./UserDetails.scss";

class UserDetails extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isAdmin: this.props.user.admin,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt){
    this.setState({
      isAdmin: !this.state.isAdmin
    })
  }

  async handleSubmit(evt){
    evt.preventDefault();
    await axios.put(`/auth/${this.props.user.id}`, {isAdmin: this.state.isAdmin}, {
      headers: {
        authorization: window.localStorage.token
      }
    })
    this.props.done()
  }

  render(){
    const { isAdmin } = this.state;
    const { open, onClose, user } = this.props;
    return(
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <form onSubmit={this.handleSubmit}>
            <div className="username">
              <div className="title">Username: </div>
              <div>{user.username}</div>
            </div>
            <div className="email">
              <div className="title">Email: </div>
              <div>{user.email}</div>
            </div>
            <div className="first-name">
              <div className="title">First name: </div>
              <div>{user.firstName}</div>
            </div>
            <div className="last-name">
              <div className="title">Last name: </div>
              <div>{user.lastName}</div>
            </div>
            <label>
              <input type="checkbox" 
                class="checkbox" 
                checked={isAdmin} 
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


export default connect(state => state)(UserDetails);
