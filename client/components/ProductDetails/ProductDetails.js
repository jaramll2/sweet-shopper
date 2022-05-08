import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from "axios";

import { getTags } from '../../store/tags';

import { Box, Modal } from "@mui/material";

import { modalStyle } from "../../utils";
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

import "./ProductDetails.scss";

class ProductDetails extends Component{

  constructor(props){
    super(props);
    const { name, price, weight, newProduct } = this.props.product;
    const selectedTags = this.props.product.tags?.map(tag => tag.name) || [];

    this.state = {
      name,
      price,
      weight,
      newProduct,
      error: null,
      selectedTags
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  async componentDidMount(){
    await this.props.getTags();
  }

  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSelectChange(evt){
    const value = evt.target.value;
    this.setState({selectedTags: typeof value === 'string' ? value.split(',') : value})
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
    const { open, done, product: { id }, tags } = this.props;
    const { name, price, weight, newProduct, error, selectedTags } = this.state;

    return(
      <Modal open={open}>
        <Box sx={modalStyle}>
          <form onSubmit={this.handleSubmit} className="details-form">
            {error ? <h5 className="login-error-msg">{error}</h5> : null}
            <input value={name} name="name" onChange={this.handleChange}></input>
            <input value={price} name="price" onChange={this.handleChange}></input>
            <input value={weight} name="weight" onChange={this.handleChange}></input>
            <Select 
              value={selectedTags}
              multiple
              input={<OutlinedInput label="Tag" 
              onChange={this.handleSelectChange}/>}
            >
              {tags.map(tag => <MenuItem key={tag.id} value={tag.name}>{tag.name}</MenuItem>)}
            </Select>

            {newProduct ? null : <button type='button' onClick={() => this.handleDelete(id)}>Delete Item</button>}
            <button type='button' onClick={done}>Cancel</button>
            <button>Submit</button>
          </form>

        </Box>
      </Modal>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.tags
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTags: () => {
      dispatch(getTags());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
