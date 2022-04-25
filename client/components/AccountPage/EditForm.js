import React, { Component } from "react";
import { connect } from "react-redux";

class EditForm extends Component{
  constructor(props){
    super(props);
    const { username, firstName, lastName, email } = this.props.auth;
    this.state = {
      username,
      email,
      firstName,
      lastName,
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value 
    })
  }

  handleSubmit(evt){
    evt.preventDefault();
  }

  render(){
    const { username, email, firstName, lastName, password} = this.state;

    return(
      <form onSubmit={this.handleSubmit}>
        <div>Username <input value={username} name='username' onChange={this.handleChange}/></div>
        <div>Password <input value={password} name='password' onChange={this.handleChange} type='password'/></div>
        <div>Email <input value={email} name='email' onChange={this.handleChange}/></div>
        <div>First Name <input value={firstName} name='firstName' onChange={this.handleChange}/></div>
        <div>Last Name <input value={lastName} name='lastName' onChange={this.handleChange}/></div>
        <div><button type='button' onClick={this.props.doneUpdating}>Back</button></div>
        <div><button>Submit Changes</button></div>
        
      </form>
    )
  }
}

export default connect(state => state)(EditForm);