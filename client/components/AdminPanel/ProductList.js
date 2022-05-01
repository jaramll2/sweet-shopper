import React, { Component } from "react";
import axios from "axios";
import ProductDetails from './ProductDetails';

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
    const newProduct = {name: 'New Product', price: 'price', weight: 'weight', newProduct: true}

    //sorts alphabetically by username
    products.sort((a, b) => a.name.localeCompare(b.name))
    
    return(
      <div className="admin-items">
        {displayDetails ? <ProductDetails open={displayDetails} product={selectedProduct} done={this.closeProductInfo}/> : 
        <ul className="unordered-list">
          {products.map(product => {
            return <li key={product.id} className="product" onClick={() => this.setState({displayDetails: true, selectedProduct: product})}>{product.name}</li>
          })}
        </ul>
        }
        <button onClick={() => this.setState({displayDetails: true, selectedProduct: newProduct})}>New Product</button>
      </div>
    )
  }
}

export default ProductList