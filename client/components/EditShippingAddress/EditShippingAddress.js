import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { modalStyle } from "../../utils";

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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(EditShippingAddress);
