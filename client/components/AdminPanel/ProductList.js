import React, { Component } from "react";
import axios from "axios";

class ProductList extends Component{
  constructor(){
    super();
    this.state = {
      products: []
    }
  }

  async componentDidMount(){
    const products = (await axios.get('/api/candy')).data;
    this.setState({
      products
    })
  }

  render(){
    const { products } = this.state
    return(
      <div>
        <h3>Products</h3>
        <ul>
          {products.map(product => {
            return <li key={product.id}>{product.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default ProductList