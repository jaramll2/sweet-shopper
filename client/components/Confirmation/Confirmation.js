import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

class Confirmation extends Component{

    render(){
        console.log(this.props);
        return(
            <div>
                <h1>Thank you for your purchase{ !window.localStorage.token ? '!' : `, ${this.props.auth.username}!`}</h1>
            </div>
        )
    }
}

export default connect(state=>state)(Confirmation);
