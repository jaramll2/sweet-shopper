import { Box, Modal } from "@mui/material";
import axios from "axios";
import React, { Component } from "react";


class ProductDetails extends Component{

  constructor(props){
    super(props);
    const { name, price, weight } = this.props.product
    this.state = {
      name,
      price,
      weight
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt){
    evt.preventDefault();
    await axios.put(`/api/candy/${this.props.product.id}`, this.state, {
      headers: {
        authorization: window.localStorage.token
      }
    })
    this.props.done();
  }

  render(){
    const { open } = this.props;
    const { name, price, weight } = this.state
    return(
      <Modal open={open}>
        <Box sx={modalStyle}>
          <form onSubmit={this.handleSubmit} className="details-form">
            <input value={name} name="name" onChange={this.handleChange}></input>
            <input value={price} name="price" onChange={this.handleChange}></input>
            <input value={weight} name="weight" onChange={this.handleChange}></input>
            <button>Submit</button>
          </form>

        </Box>
      </Modal>
      
    )
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

export default ProductDetails;