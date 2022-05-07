import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { modalStyle } from "../../utils";
import "./AccountModal.scss";

class AccountModal extends Component {
  state = {
    isLoginForm: true,
    error: false,
    username: "",
    password: "",
    step: 1,
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    usState:"",
    zipcode: ""

  };

  toggleFormType = () => {
    this.setState((prev) => ({
      isLoginForm: !prev.isLoginForm,
      error: false,
      username: "",
      password: "",
    }));
  };

  nextStep = ()=>{
    const {step} = this.state;
    this.setState({ step: step + 1});
  }

  prevStep = ()=>{
    const {step} = this.state;
    this.setState({ step: step - 1});
  }

  continue = (e) => {
    e.preventDefault();
    this.nextStep();
  }

  back = (e) => {
    e.preventDefault();
    this.prevStep();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { isLoginForm } = this.state;
    console.log('event target');
    console.log(event.target);
    console.log('state');
    console.log(this.state);
    const { handleAuthenticate, toggleLoginModal, openNotification } = this.props;
    const { username, password, firstName, lastName, email, address, city, usState, zipcode } = this.state;
    
    let response;
    if(isLoginForm){
      response = await handleAuthenticate(
        username,
        password,
        isLoginForm ? "login" : "signup"
    );
    }
    else{
        response = await handleAuthenticate(
          username,
          password,
          isLoginForm ? "login" : "signup",
          firstName,
          lastName,
          email,
          address,
          city,
          usState,
          zipcode,
      );
    }
    
    if (!response.auth.error) {
      toggleLoginModal();
      openNotification("You have logged in.");
      this.setState({ username: "", password: "" });
      this.props.history.push('/account');
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
      isLoginForm: true
    });
  };

  switch = (step)=> {
    const {username, password, firstName, lastName, email, address, city, usState, zipcode} = this.state;

    switch (step) {
      case 1:
        return (
          <>
          <input name="username" value={username} type="text" placeholder="Username" onChange={this.handleInputChange}/>
          <input name="password" value={password} type="password" placeholder="Password" onChange={this.handleInputChange}/>
          <input name="firstName" value={firstName} type="text" placeholder="First Name" onChange={this.handleInputChange}/>
          <input name="lastName" value={lastName} type="text" placeholder="Last Name" onChange={this.handleInputChange}/>
          <input name="email" value={email} type="text" placeholder="Email" onChange={this.handleInputChange}/>
          <button type='button' onClick={this.continue}>Continue</button></>
        );
      case 2:
        return (
          <><input name="address" value={address} type="text" placeholder="Address" onChange={this.handleInputChange}/>
          <input name="city" value={city} type="text" placeholder="City" onChange={this.handleInputChange}/>
          <input name="usState" value={usState} type="text" placeholder="State" onChange={this.handleInputChange}/>
          <input name="zipcode" value={zipcode} type="text" placeholder="Zipcode" onChange={this.handleInputChange}/>
          <button type='button'  onClick={this.prevStep}>Back</button>
          <button type = 'submit'>SIGN UP</button></>
        );
    };
  }

  render() {
    const { isLoginForm, error, username, password, step } = this.state;
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
              
              { isLoginForm? (
                <><input
                  name="username"
                  value={username}
                  type="text"
                  placeholder="Username"
                  onChange={this.handleInputChange} /><input
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={this.handleInputChange} />
                    <button type="submit">LOG IN</button>
                    </>
              ): this.switch(step) }

              {/* {!isLoginForm ? (
                <input name="firstName" type="text" placeholder="First Name" />
              ) : null}
              {!isLoginForm ? <input name="lastName" type="text" placeholder="Last Name" /> : null}
              {!isLoginForm ? <input name="email" type="text" placeholder="Email" /> : null} */}
              
              {/* <button type="submit">{isLoginForm ? "LOG IN" : "SIGN UP"}</button> */}
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

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  handleAuthenticate: (username, password, formName, firstName, lastName, email) =>
    dispatch(authenticate(username, password, formName, firstName, lastName, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountModal);
