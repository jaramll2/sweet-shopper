import { Box, Modal } from "@mui/material";
import axios from "axios";
import React, { Component } from "react";


class ProductDetails extends Component{

  constructor(props){
    super(props);

  const { name, price, weight, newProduct } = this.props.product


    this.state = {
      name,
      price,
      weight,
      newProduct,
      error: null
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

    try{
      
      //a new product will make a post request, existing product will make a put request
      if(this.state.newProduct){
        await axios.post('/api/candy', this.state, {
          headers: {
            authorization: window.localStorage.token
          }
        })
      }
      else{
        await axios.put(`/api/candy/${this.props.product.id}`, this.state, {
          headers: {
            authorization: window.localStorage.token
          }
        })
      }
      this.props.done();
    }
    catch( error ){
      this.setState({error: error.response.data})

    }


  }

  async handleDelete(id){

    try{
      await axios.delete(`/api/candy/${id}`, {
        headers: {
          authorization: window.localStorage.token
        }
      });
    }
    catch(error){
      this.setState({error: error.response.data})
    }



    this.props.done();
  }

  render(){
    const { open, done, product: { id } } = this.props;
    const { name, price, weight, newProduct, error} = this.state
    return(
      <Modal open={open}>
        <Box sx={modalStyle}>
          <form onSubmit={this.handleSubmit} className="details-form">
            {error ? <h5 className="login-error-msg">{error}</h5> : null}
            <input value={name} name="name" onChange={this.handleChange}></input>
            <input value={price} name="price" onChange={this.handleChange}></input>
            <input value={weight} name="weight" onChange={this.handleChange}></input>
            {newProduct ? null : <button type='button' onClick={() => this.handleDelete(id)}>Delete Item</button>}
            <button type='button' onClick={done}>Cancel</button>
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