import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";

import "./AccountModal.scss";

class AccountModal extends Component {
  state = {
    isLoginForm: true,
  };

  toggleFormType = () => {
    this.setState((prev) => ({ isLoginForm: !prev.isLoginForm }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { isLoginForm } = this.state;
    const { handleAuthenticate, toggleLoginModal } = this.props;
    const { username, password } = event.target;
    await handleAuthenticate(username.value, password.value, isLoginForm ? "login" : "signup");
    toggleLoginModal();
  };

  render() {
    const { isLoginForm } = this.state;

    return (
      <div className="login-modal-body">
        <h4>{isLoginForm ? "Please log in to your account." : "Please enter your details."}</h4>
        <form className="login-modal-form" onSubmit={this.handleSubmit}>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">{isLoginForm ? "LOG IN" : "SIGN UP"}</button>
        </form>
        {isLoginForm && (
          <div>
            Not a member?{" "}
            <span className="signup-link" onClick={this.toggleFormType}>
              <b>Join us</b>
            </span>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleAuthenticate: (username, password, formName) =>
    dispatch(authenticate(username, password, formName)),
});

export default connect(() => ({}), mapDispatchToProps)(AccountModal);
