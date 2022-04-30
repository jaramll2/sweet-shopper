import { Box, Modal } from "@mui/material";
import React, { Component } from "react";


class UserDetails extends Component {
  

  render(){
    const { open, done, user } = this.props
    return(
      <Modal open={open}>
        <Box sx={modalStyle}>
          <h3>{user.username}</h3>
          <h5>{user.email}</h5>
          <h5>{user.firstName}</h5>
          <h5>{user.lastName}</h5>
          <label><input type="checkbox" id='admin' defaultChecked={user.admin}/>Admin</label>
          
          <button onClick={done}>Back</button>
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
export default UserDetails;