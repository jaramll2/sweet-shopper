import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { logout } from "../../store/auth";
import AccountModal from "../AccountModal";

import "./AccountMenu.scss";

class AccountMenu extends Component {
  state = {
    loginModalOpen: false,
    userMenuOpen: false,
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ userMenuOpen: false });
    }
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
      <div className="user-menu-container" ref={this.wrapperRef}>
        <PersonIcon fontSize="large" className="navbar-icon" onClick={this.handleUserIconClick} />
        <div className={userMenuClass}>
          <div className="user-menu-item">
            <span className="user-menu-username">{user.username?.[0]}</span>
            {user.username}
          </div>
          <div className="user-menu-item">
            <AccountCircleIcon className="user-menu-icon" />
            Profile
          </div>
          <div className="user-menu-item">
            <SettingsIcon className="user-menu-icon" />
            Settings
          </div>
          <div className="user-menu-item" onClick={this.handleLogout}>
            <LogoutIcon className="user-menu-icon" />
            Log Out
          </div>
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
