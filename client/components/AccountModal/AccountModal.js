import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import "./AccountModal.scss";

class AccountModal extends Component {
  state = {
    isLoginForm: true,
    error: false,
    username: "",
    password: "",
  };

  toggleFormType = () => {
    this.setState((prev) => ({ isLoginForm: !prev.isLoginForm }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { isLoginForm } = this.state;
    const { handleAuthenticate, toggleLoginModal, openNotification } = this.props;
    const { username, password } = event.target;
    const response = await handleAuthenticate(
      username.value,
      password.value,
      isLoginForm ? "login" : "signup"
    );
    if (!response.auth.error) {
      toggleLoginModal();
      openNotification("You have logged in.");
      this.setState({ username: "", password: "" });
    } else {
      this.setState({ error: true });
    }
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, error: false });
  };

  handleClose = () => {
    this.props.toggleLoginModal();
    this.setState({
      error: false,
      username: "",
      password: "",
    });
  };

  render() {
    const { isLoginForm, error, username, password } = this.state;
    const { modalOpen } = this.props;
    const formClass = `login-modal-form ${error ? "error" : ""}`;

    return (
      <Modal open={modalOpen} onClose={this.handleClose}>
        <Box sx={modalStyle}>
          <div className="login-modal-body">
            <h3>Welcome to Sweet Shopper</h3>
            <h4>{isLoginForm ? "Please log in to your account." : "Please enter your details."}</h4>
            {error && (
              <span className="login-error-msg">
                Authentication failed. Please check your username and password.
              </span>
            )}
            <form className={formClass} onSubmit={this.handleSubmit}>
              <input
                name="username"
                value={username}
                type="text"
                placeholder="Username"
                onChange={this.handleInputChange}
              />
              <input
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleInputChange}
              />
              <button type="submit">{isLoginForm ? "LOG IN" : "SIGN UP"}</button>
            </form>
            {isLoginForm && (
              <div className="check-member">
                Not a member?{" "}
                <span className="signup-link" onClick={this.toggleFormType}>
                  <b>Join us</b>
                </span>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    );
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

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  handleAuthenticate: (username, password, formName) =>
    dispatch(authenticate(username, password, formName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountModal);
