import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { logout } from "../../store/auth";

import "./Navbar.scss";

class Navbar extends Component {
  state = {
    searchFocused: false,
    searchText: "",
    navbarScrolled: false,
    isHomePage: true,
    mobileNavOpen: false,
    userMenuOpen: false,
    loginModalOpen: false,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.props.history.listen((location) => {
      this.setState({ isHomePage: location.pathname === "/" });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  toggleSearch = () => {
    this.setState(
      (prev) => ({ searchFocused: !prev.searchFocused }),
      () => {
        if (this.state.searchFocused) {
          this.searchInput.focus();
        }
      }
    );
  };

  handleFocusOut = () => {
    this.setState({ searchFocused: false, searchText: "" });
  };

  handleSearchChange = (event) => {
    this.setState({ searchText: event.target.value });
  };

  handleScroll = () => {
    const verticalPosition = window.scrollY;
    if (verticalPosition > 80) {
      this.setState({ navbarScrolled: true });
    } else {
      this.setState({ navbarScrolled: false });
    }
  };

  toggleMobileNav = () => {
    this.setState((prev) => ({ mobileNavOpen: !prev.mobileNavOpen }));
  };

  toggleUserMenu = () => {
    this.setState((prev) => ({ userMenuOpen: !prev.userMenuOpen }));
  };

  toggleLoginModal = () => {
    this.setState((prev) => ({ loginModalOpen: !prev.loginModalOpen }));
  };

  handleUserIconClick = () => {
    const isLoggedIn = Boolean(this.props.auth?.id);
    if (isLoggedIn) {
      this.toggleUserMenu();
    } else {
      this.toggleLoginModal();
    }
  };

  render() {
    const {
      searchFocused,
      searchText,
      navbarScrolled,
      isHomePage,
      mobileNavOpen,
      userMenuOpen,
      loginModalOpen,
    } = this.state;
    const { auth, handleLogout } = this.props;
    const isLoggedIn = Boolean(auth?.id);
    const searchWidth = searchFocused ? "160px" : "30px";
    const navbarClass = `navbar ${navbarScrolled ? "scrolled" : ""} ${
      isHomePage ? "homepage" : ""
    }`;
    const userMenuClass = `user-menu ${userMenuOpen ? "open" : ""}`;

    return (
      <div className={navbarClass}>
        <span className="navbar-mobile">
          <MenuIcon onClick={this.toggleMobileNav} />
          <Modal
            open={mobileNavOpen}
            onClose={this.toggleMobileNav}
            aria-labelledby="navigation"
            aria-describedby="navigation"
          >
            <Box className="navbar-mobile-box" onClick={this.toggleMobileNav}>
              <Link className="mobile-nav-link" to="/">
                Home
              </Link>
              <Link className="mobile-nav-link" to="/candy">
                Shop
              </Link>
              <Link className="mobile-nav-link" to="/about">
                About
              </Link>
            </Box>
          </Modal>
        </span>
        <span className="navbar-left">
          <Link to="/">SS</Link>
          <Link to="/">Home</Link>
          <Link to="/candy">Shop</Link>
          <Link to="/about">About</Link>
        </span>
        <span className="navbar-right">
          <TextField
            inputRef={(input) => {
              this.searchInput = input;
            }}
            disabled={!searchFocused}
            value={searchText}
            onChange={this.handleSearchChange}
            onBlur={this.handleFocusOut}
            className="navbar-search"
            InputProps={{
              disableUnderline: !searchFocused,
              startAdornment: (
                <InputAdornment
                  sx={{
                    color: "#000",
                  }}
                  position="start"
                  onClick={this.toggleSearch}
                >
                  <SearchIcon className="navbar-icon" />
                </InputAdornment>
              ),
            }}
            variant="standard"
            style={{
              width: searchWidth,
              borderBottom: "none",
              transition: "0.2s ease",
            }}
          />
          <div className="user-menu-container">
            <PersonIcon className="navbar-icon" onClick={this.handleUserIconClick} />
            <div className={userMenuClass}>
              <span>mnozawa@gmail.com</span>
              <span>Account</span>
              <span>Settings</span>
              <span>Log Out</span>
            </div>
            <Modal open={loginModalOpen} onClose={this.toggleLoginModal}>
              <div className="login-modal-style">asdfasdfasdfasdfasdf</div>
            </Modal>
          </div>
          {isLoggedIn ? (
            <span className="navbar-logout" onClick={() => handleLogout()}>
              Log Out
            </span>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
          <Link className="icon-link" to="/cart">
            <ShoppingCartIcon className="navbar-icon" />
          </Link>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
