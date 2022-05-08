import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Button from "@mui/material/Button";

import UserDetails from "../UserDetails";

import "./UserList.scss";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showUserDetails: false,
      selectedUser: {},
    };

    this.displayUserInfo = this.displayUserInfo.bind(this);
    this.closeUserInfo = this.closeUserInfo.bind(this);
  }

  async componentDidMount() {
    const users = (await axios.get("/api/users")).data;
    this.setState({
      users,
    });
  }

  displayUserInfo(userId) {
    this.setState({
      showUserDetails: true,
      selectedUser: this.state.users.find((user) => user.id === userId),
    });
  }

  async closeUserInfo() {
    this.setState({
      showUserDetails: false,
    });
    const users = (await axios.get("/api/users")).data;

    this.setState({
      users,
    });
  }

  render() {
    const { users, showUserDetails, selectedUser } = this.state;
    if (!users) return null;

    //sorts alphabetically by username
    users.sort((a, b) => a.username.localeCompare(b.username));


    return (
      <div className="admin-items">
        {showUserDetails ? (
          <UserDetails open={showUserDetails} onClose={this.closeUserInfo} user={selectedUser} />
        ) : (
          // <ul className="unordered-list">
          <ul className="responsive-table unordered-list">
            <li className="table-header">
              <div className="col-1">Admin</div>
              <div className="col-2">ID</div>
              <div className="col-3">Username</div>
              <div className="col-4">Email</div>
              <div className="col-5"></div>
            </li>
            {users.map((user) => {
              return (
                <li className="table-row" key={user.id}>
                  <div className="col col-1">
                    <div className="round">
                      <input
                        type="checkbox"
                        checked={user.admin}
                        disabled={user.id === this.props.auth.id ? true : false}
                        readOnly
                      />
                      <label htmlFor="checkbox"></label>
                    </div>
                  </div>
                  <div className="col col-2">{user.id}</div>
                  <div className="col col-3">{user.username}</div>
                  <div className="col col-4">{user.email}</div>
                  <div className="col col-5" onClick={() => this.displayUserInfo(user.id)}>
                    <Button className="edit-button">Edit</Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default connect((state) => state)(UserList);
