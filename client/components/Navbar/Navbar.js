import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import { logout } from "../../store/auth";

import "./Navbar.scss";

class Navbar extends Component {
  state = {
    searchFocused: false,
    searchText: "",
  };

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

  render() {
    const { searchFocused, searchText } = this.state;
    const { auth, handleLogout } = this.props;
    const isLoggedIn = Boolean(auth?.id);
    const searchWidth = searchFocused ? "160px" : "30px";
    return (
      <div className="navbar">
        <span className="navbar-left">
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
          <Link to="/cart">
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
