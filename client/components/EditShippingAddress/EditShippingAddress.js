import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { modalStyle } from "../../utils";


import { editUserInfo } from "../../store/auth";
import "./EditShippingAddress.scss";

class EditShippingAddress extends Component {
  constructor(props) {
    super(props);
    const { address, city, usState, zipcode } = this.props.auth;
    this.state = {
      address,
      city,
      usState,
      zipcode,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.editUserInfo(this.state);
    this.props.toggleModal();
  }

  render() {
    const { address, city, usState, zipcode } = this.state;
    const { open, toggleModal } = this.props;

    return (
      <Modal open={open} onClose={toggleModal}>
        <Box sx={modalStyle}>
        <div className="edit-modal-body">
          <h2>Edit Shipping Address</h2>

          <form onSubmit={this.handleSubmit} className="edit-modal-form">
              <div className="user-address">
                <div className="header-name">Address</div>
                <input value={address} name="address" onChange={this.handleChange} />
              </div>
              <div className="user-address">
                <div className="header-name">City</div>
                <input value={city} name="city" onChange={this.handleChange} />
              </div>
              <div className="user-address">
                <div className="header-name">State</div>
                <input value={usState} name="usState" onChange={this.handleChange} />
              </div>
              <div className="user-address">
                <div className="header-name">Zipcode</div>
                <input value={zipcode} name="zipcode" onChange={this.handleChange} />
              </div>
              <div className="button-container">
                <button type="button" onClick={this.props.toggleModal}>Back</button>
                <button>Submit Changes</button>
              </div>
            </form>

        </div>
          
        </Box>
      </Modal>
    )
  }
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUserInfo: function (user) {
      return dispatch(editUserInfo(user));
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EditShippingAddress);
