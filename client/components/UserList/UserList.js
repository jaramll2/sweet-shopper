import React, { Component } from "react";
import axios from 'axios';

import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import UserDetails from "../UserDetails";

import "./UserList.scss";

class UserList extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      showUserDetails: false,
      selectedUser: {}
    }

    this.displayUserInfo = this.displayUserInfo.bind(this);
    this.closeUserInfo = this.closeUserInfo.bind(this);
  }


  async componentDidMount(){
    const users = (await axios.get('/api/users')).data;
    this.setState({
      users
    })
  }

  displayUserInfo(userId){
    this.setState({
      showUserDetails: true,
      selectedUser: this.state.users.find((user) => user.id === userId)
    })
  }

  async closeUserInfo(){
    this.setState({
      showUserDetails: false
    })
    const users = (await axios.get('/api/users')).data;

    this.setState({
      users
    })
  }

  render(){
    const { users, showUserDetails, selectedUser } = this.state
    if(!users)
      return null;

    //sorts alphabetically by username
    users.sort((a, b) => a.username.localeCompare(b.username))

    return(
      <div className="admin-items">
        {showUserDetails ? <UserDetails open={showUserDetails} done={this.closeUserInfo} user={selectedUser}/> :
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col-1">Admin</div>
              <div className="col-2">ID</div>
              <div className="col-3">Username</div>
              <div className="col-4">Email</div>
              <div className="col-5"></div>
              <div className="col-6"></div>
            </li>
            {users.map(user => {
              return (
                <li className="table-row unordered-list" key={user.id}>
                  <div className="col col-1">
                    <div className="round">
                      <input type="checkbox" checked="checkbox"/>
                      <label htmlFor="checkbox"></label>
                    </div>
                  </div>
                  <div className="col col-2">{user.id}</div>
                  <div className="col col-3">{user.username}</div>
                  <div className="col col-4">{user.email}</div>
                  <div className="col col-5" onClick={() => this.displayUserInfo(user.id)}>
                    <Button className="edit-button">Edit</Button>
                  </div>
                  <div className="col col-6">
                    <DeleteOutlineIcon fontSize="large"/>
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

export default UserList
