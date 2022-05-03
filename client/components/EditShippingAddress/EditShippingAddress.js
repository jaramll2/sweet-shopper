import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import "./EditShippingAddress.scss";

class EditShippingAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    };
  }

  render() {
    const { open, toggleModal } = this.props;

    return (
      <Modal open={open} onClose={toggleModal}>
        <Box sx={modalStyle}>
          <h2>Edit Shipping Address</h2>
        </Box>
      </Modal>
    )
  }
};

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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(EditShippingAddress);
