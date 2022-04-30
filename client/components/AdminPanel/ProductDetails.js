import { Box, Modal } from "@mui/material";
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
  }

  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render(){
    const { open, done } = this.props;
    const { name, price, weight } = this.state
    return(
      <Modal open={open}>
        <Box sx={modalStyle}>
          <input value={name} name="name" onChange={this.handleChange}></input>
          <input value={price} name="price" onChange={this.handleChange}></input>
          <input value={weight} name="weight" onChange={this.handleChange}></input>
          <button onClick={done}>Submit</button>


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