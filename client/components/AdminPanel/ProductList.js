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

  closeProductInfo(){
    this.setState({
      displayDetails: false
    })
  }

  render(){
    const { products, displayDetails, selectedProduct } = this.state
    return(
      <div className="admin-items">
        {displayDetails ? <ProductDetails open={displayDetails} product={selectedProduct} done={this.closeProductInfo}/> : 
        <ul className="unordered-list">
          {products.map(product => {
            return <li key={product.id} className="product" onClick={() => this.setState({displayDetails: true, selectedProduct: product})}>{product.name}</li>
          })}
        </ul>
        }
      </div>
    )
  }
}

export default ProductList