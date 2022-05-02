import { Box, Modal } from "@mui/material";
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class UserDetails extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isAdmin: this.props.user.admin
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
    const { open, done, user } = this.props;
    return(
      <Modal open={open} >
        <Box sx={modalStyle}>
          <form onSubmit={this.handleSubmit}>
            <h3>{user.username}</h3>
            <h5>{user.email}</h5>
            <h5>{user.firstName}</h5>
            <h5>{user.lastName}</h5>
            <label><input type="checkbox" checked={isAdmin} onChange={this.handleChange} disabled={user.id === this.props.auth.id ? true : false}/>Admin</label>
            
            <button>Submit</button>
          </form>
        </Box>
      </Modal>
    )
  }
}
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  background: "#ffffff",
  transform: "translate(-50%, -50%)",
  minWidth: "40%",
  maxWidth: "80%",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};
export default connect(state => state)(UserDetails);