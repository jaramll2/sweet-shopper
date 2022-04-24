import React, { Component }  from "react";
import ProductList from "./ProductList";
import UserList from "./UserList";

class AdminPanel extends Component{
  constructor(){
    super();
    this.state = {
      displayUsers: true
    }

    this.displayUsers = this.displayUsers.bind(this);
    this.displayProducts = this.displayProducts.bind(this);
  }
  
  displayUsers(){
    this.setState({
      displayUsers:true
    })
  }

  displayProducts(){
    this.setState({
      displayUsers:false
    })
  }

  render(){
    const { displayUsers } = this.state;

    return(
      <div>
        <nav>
          <button onClick={this.displayUsers}>users</button>
          <button onClick={this.displayProducts}>products</button>
        </nav>
        {displayUsers ? <UserList/> : <ProductList/>}
      </div>
      
    )
  }
}

export default AdminPanel