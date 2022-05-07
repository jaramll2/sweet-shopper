import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../store/auth";
import NavbarSearch from "../NavbarSearch";
import MobileNavbar from "../MobileNavbar";
import AccountMenu from "../AccountMenu";
import Cart from "../Cart";

import "./Navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);

    const { pathname } = props.history.location;

    this.state = {
      navbarScrolled: false,
      isHomePage: pathname === "/",
      isCandyPage: pathname.includes("/candy/"),
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.props.history.listen(({ pathname }) => {
      this.setState({
        isHomePage: pathname === "/",
        isCandyPage: pathname.includes("/candy/"),
      });
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
    const { location: { pathname } } = this.props;
    const { navbarScrolled, isHomePage, isCandyPage } = this.state;
    const navbarClass = `navbar ${navbarScrolled ? "scrolled" : ""} ${isHomePage ? "homepage" : ""} ${isCandyPage ? "candy-page" : ""}`;
    return (
      <div className={navbarClass}>
        <MobileNavbar />
        <span className="navbar-left">
          <Link to="/" className="shop-name-container">
            <span className="sweet-shopper">
              <span>SWEET</span>
              <span>SHOPPER</span>
            </span>
            <img src="./candy.png" />
          </Link>
        </span>
        <span className="navbar-center">
          <Link to="/" className={pathname === '/' ? 'selected' : ''}>Home</Link>
          <Link to="/candy" className={pathname.search('/candy') != -1 ? 'selected' : ''}>Shop</Link>
          <Link to="/about" className={pathname === '/about' ? 'selected' : ''}>About</Link>
        </span>
        <span className="navbar-right">
          <NavbarSearch />
          <AccountMenu />
          <Cart />
        </span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
});

export default withRouter(connect(() => ({}), mapDispatchToProps)(Navbar));
