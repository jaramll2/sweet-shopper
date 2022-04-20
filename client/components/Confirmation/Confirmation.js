import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

class Confirmation extends Component{

    render(){
        return(
            <div>
                <h1>Thank you for your purchase, 'name'!</h1>
            </div>
        )
    }
}

export default connect(state=>state)(Confirmation);
