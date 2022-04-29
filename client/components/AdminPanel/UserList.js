import React, { Component } from "react";
import axios from 'axios';

import './AdminPanel.scss'

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
      <div className="admin-items">
        <ul className="unordered-list">
          {users.map(user => {
            return <li key={user.id} className="user">{user.username}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default UserList