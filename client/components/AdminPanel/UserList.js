import React, { Component } from "react";
import axios from 'axios';

class UserList extends Component{
  constructor(){
    super();
    this.state = {
      users: []
    }
  }


  async componentDidMount(){
    const users = (await axios.get('/api/users')).data;
    this.setState({
      users
    })
  }

  render(){
    const { users } = this.state
    return(
      <div>
        <h3>Users</h3>
        <ul>
          {users.map(user => {
            return <li key={user.id}>{user.username}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default UserList