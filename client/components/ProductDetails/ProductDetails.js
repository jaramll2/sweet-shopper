import React, { Component } from "react";
import axios from "axios";

import { Box, Modal } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import { modalStyle } from "../../utils";

import "./ProductDetails.scss";

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
            <div className="prpduct-details">
              <div className="container-left">
                <div className="img-container">
                  <img />
                  <CloudUploadOutlinedIcon fontSize="large"/>
                </div>
                <div>Choose img</div>
                <button>Choose</button>
              </div>

              <div className='container-right'> 
                <div className="input product-name">
                  <div className="title">Product name</div>
                  <input value={name} name="name" onChange={this.handleChange} />
                </div>
                <div className="input weight">
                  <div className="title">Weight</div>
                  <input value={weight} name="weight" onChange={this.handleChange} />
                </div>
                <div className="input price">
                  <div className="title">Price</div>
                  <input value={price} name="price" onChange={this.handleChange} />
                </div>
                <div className="button-container">
                  {newProduct ? null : (
                    <DeleteOutlineOutlinedIcon 
                      onClick={() => this.handleDelete(id)} 
                      fontSize="large"
                    />
                  )}
                  {/* <button type='button' onClick={done}>Cancel</button> */}
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </form>

        </Box>
      </Modal>
      
    )
  }
}

export default ProductDetails;
