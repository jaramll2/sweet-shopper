import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { logout } from "../../store/auth";
import NavbarSearch from "../NavbarSearch";
import MobileNavbar from "../MobileNavbar";
import AccountMenu from "../AccountMenu";

import "./Navbar.scss";

class Navbar extends Component {
  state = {
    navbarScrolled: false,
    isHomePage: true,
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

  handleScroll = () => {
    const verticalPosition = window.scrollY;
    if (verticalPosition > 80) {
      this.setState({ navbarScrolled: true });
    } else {
      this.setState({ navbarScrolled: false });
    }
  };

  render() {
    const { navbarScrolled, isHomePage } = this.state;
    const navbarClass = `navbar ${navbarScrolled ? "scrolled" : ""} ${
      isHomePage ? "homepage" : ""
    }`;

    return (
      <div className={navbarClass}>
        <MobileNavbar />
        <span className="navbar-left">
          <Link to="/">SS</Link>
          <Link to="/">Home</Link>
          <Link to="/candy">Shop</Link>
          <Link to="/about">About</Link>
        </span>
        <span className="navbar-right">
          <NavbarSearch />
          <AccountMenu />
          <Link className="icon-link" to="/cart">
            <ShoppingCartIcon fontSize="large" className="navbar-icon" />
          </Link>
        </span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
});

export default withRouter(connect(() => ({}), mapDispatchToProps)(Navbar));
