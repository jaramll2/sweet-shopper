import React, { Component } from "react";
import { connect } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { logout } from "../../store/auth";
import AccountModal from "../AccountModal";

import "./AccountMenu.scss";

class AccountMenu extends Component {
  state = {
    loginModalOpen: false,
    userMenuOpen: false,
  };

  toggleLoginModal = () => {
    this.setState((prev) => ({ loginModalOpen: !prev.loginModalOpen }));
  };

  toggleUserMenu = () => {
    this.setState((prev) => ({ userMenuOpen: !prev.userMenuOpen }));
  };

  handleUserIconClick = () => {
    const isLoggedIn = Boolean(this.props.user?.id);
    if (isLoggedIn) {
      this.toggleUserMenu();
    } else {
      this.toggleLoginModal();
    }
  };

  handleLogout = async () => {
    await this.props.handleLogout();
    this.toggleUserMenu();
  };

  render() {
    const { userMenuOpen, loginModalOpen } = this.state;
    const { user } = this.props;
    const userMenuClass = `user-menu ${userMenuOpen ? "open" : ""}`;

    return (
      <div className="user-menu-container">
        <PersonIcon fontSize="large" className="navbar-icon" onClick={this.handleUserIconClick} />
        <div className={userMenuClass}>
          <span>Logged in as {user?.username}</span>
          <span>Account</span>
          <span>Settings</span>
          <span onClick={this.handleLogout}>Log Out</span>
        </div>
        <Modal open={loginModalOpen} onClose={this.toggleLoginModal}>
          <Box sx={loginModalStyle}>
            <AccountModal toggleLoginModal={this.toggleLoginModal} />
          </Box>
        </Modal>
      </div>
    );
  }
}

const loginModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  background: "#ffffff",
  transform: "translate(-50%, -50%)",
  minWidth: "40%",
  maxWidth: "80%",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const mapStateToProps = (state) => ({
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);
