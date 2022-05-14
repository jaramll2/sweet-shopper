import React, { Component } from "react";
import { connect } from "react-redux";

import { Box, Modal } from "@mui/material";

import { editUserInfo } from "../../store/auth";
import { modalStyle } from "../../utils";

import "./EditAccount.scss";

class EditAccount extends Component {
  constructor(props) {
    super(props);
    const { username, firstName, lastName, email } = this.props.auth;
    this.state = {
      username,
      email,
      firstName,
      lastName,
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
    const { username, email, firstName, lastName, password } = this.state;
    const { open, toggleModal } = this.props;
    return (
      <Modal open={open} onClose={toggleModal}>
        <Box sx={modalStyle}>
          <div className="edit-user-info">
            <h2>Edit User Information</h2>
            <form onSubmit={this.handleSubmit} className="edit-modal-form">
              <div className="user-info">
                <div className="header-name">Username</div>
                <input value={username} name="username" onChange={this.handleChange} />
              </div>
              <div className="user-info">
                <div className="header-name">Email</div>
                <input value={email} name="email" onChange={this.handleChange} />
              </div>
              <div className="user-info">
                <div className="header-name">First Name </div>
                <input value={firstName} name="firstName" onChange={this.handleChange} />
              </div>
              <div className="user-info">
                <div className="header-name">Last Name</div>
                <input value={lastName} name="lastName" onChange={this.handleChange} />
              </div>
              <div className="button-container">
                <button type="button" onClick={this.props.toggleModal}>Back</button>
                <button>Submit Changes</button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    editUserInfo: function (user) {
      return dispatch(editUserInfo(user));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(EditAccount);
