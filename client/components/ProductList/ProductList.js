import React, { Component } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';  

import ProductDetails from '../ProductDetails/ProductDetails';

import "./ProductList.scss";

class ProductList extends Component{
  constructor(){
    super();
    this.state = {
      products: [],
      displayDetails: false,
      selectedProduct: {}
    }

    this.closeProductInfo = this.closeProductInfo.bind(this)
  }

  async componentDidMount(){
    const products = (await axios.get('/api/candy')).data;
    this.setState({
      products
    })
  }

  async closeProductInfo(){
    this.setState({
      displayDetails: false
    })
    const products = (await axios.get('/api/candy')).data;
    this.setState({
      products
    })
  }

  render(){
    const { products, displayDetails, selectedProduct } = this.state

    //object to send to form when we're creating a new product
    const newProduct = {name: 'New Product', price: 'price', weight: 'weight', newProduct: true, imageUrl: 'Image Url'}

    //sorts alphabetically by username
    products.sort((a, b) => a.name.localeCompare(b.name))
    
    return(
      <div className="admin-items">
        <div className="add-item">
          <AddCircleOutlinedIcon 
            className="add-icon"
            onClick={() => this.setState({displayDetails: true, selectedProduct: newProduct})}
          />
          <span>Add New Product</span>
        </div>
        {displayDetails ? <ProductDetails open={displayDetails} product={selectedProduct} done={this.closeProductInfo}/> : 
        <ul className=" responsive-table unordered-list">
          <li className="table-header">
            <div className="col-1">ID</div>
            <div className="col-2">Product name</div>
            <div className="col-3">Weight</div>
            <div className="col-4">Price</div>
            <div className="col-5"></div>
          </li>
          {products.map(product => {
            return (
              <li key={product.id} className=" table-row product">
                {/*  */}
                <div className="col col-1">{product.id}</div>
                <div className="col col-2">{product.name}</div>
                <div className="col col-3">{product.weight}</div>
                <div className="col col-4">{product.price}</div>
                <div className="col col-5" onClick={() => this.setState({displayDetails: true, selectedProduct: product})}>
                  <Button className="edit-button">Edit</Button>
                </div>
              </li>
            )
          })}
        </ul>
        }
        
        
      </div>
    )
  }
}

export default ProductList
