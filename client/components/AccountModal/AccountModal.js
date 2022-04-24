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
    const { username, password, firstName, lastName, email } = event.target;

    await handleAuthenticate(username.value, password.value, isLoginForm ? "login" : "signup", firstName?.value, lastName?.value, email?.value);
    toggleLoginModal();
  };

  render() {
    const { isLoginForm } = this.state;

    return (
      <div className="login-modal-body">
        <h2>Welcome to Sweet Shopper</h2>
        <h4>{isLoginForm ? "Please log in to your account." : "Please enter your details."}</h4>
        <form className="login-modal-form" onSubmit={this.handleSubmit}>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          {!isLoginForm ? <input name="firstName" type="text" placeholder="First Name"/> : null}
          {!isLoginForm ? <input name="lastName" type="text" placeholder="Last Name"/> : null}
          {!isLoginForm ? <input name="email" type="text" placeholder="Email"/> : null}
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
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleAuthenticate: (username, password, formName, firstName, lastName, email) =>
    dispatch(authenticate(username, password, formName, firstName, lastName, email)),
});

export default connect(() => ({}), mapDispatchToProps)(AccountModal);
