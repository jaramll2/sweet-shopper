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
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.props.history.listen(({ pathname }) => {
      this.setState({
        isHomePage: pathname === "/",
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
    const { navbarScrolled, isHomePage } = this.state;
    const navbarClass = `navbar ${navbarScrolled ? "scrolled" : ""} ${isHomePage ? "homepage" : ""}`;
    return (
      <div className={navbarClass}>
        <MobileNavbar />
        <span className="navbar-left">
          <Link to="/">
            <span className="sweet-shopper">
              <span>SWEET</span>
              <span>SHOPPER</span>
            </span>
            <img src="/logo.png" />
          </Link>
        </span>
        <span className="navbar-center">
          <ul className="select-container">
            <li className="home-label">
              <Link to="/" className={pathname === '/' ? 'selected' : ''}>Home</Link>
            </li>
            <li className="shop-label">
              <Link to="/candy/page/1/" className={pathname.search('/candy') != -1 ? 'selected' : ''}>Shop</Link>
              <ul className="sub-menu">
                <div className="category-container">
                  <li>
                    <Link to='/candy/page/1/filter/["Chocolate"]'>
                      <div className="nav-cotegory-text">Chocolate</div>
                      <img className="nav-category-image" src="/Image/nav-chocolate.jpeg" />
                    </Link>
                  </li>
                  <li>
                    <Link to='/candy/page/1/filter/["Hard%20Candy"]'>
                      <div className="nav-cotegory-text">Candy</div>
                      <img className="nav-category-image" />
                    </Link>
                  </li>
                  <li>
                    <Link to='/candy/page/1/filter/["Caramel"]'>
                      <div className="nav-cotegory-text">Caramel</div>
                      <img className="nav-category-image"/>
                    </Link>
                  </li>
                  <li>
                    <Link to='/candy/page/1/filter/["Gummy"]'>
                      <div className="nav-cotegory-text">Gummy</div>
                      <img className="nav-category-image"/>
                    </Link>
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </span>
        <span className="navbar-right">
          <NavbarSearch />
          <AccountMenu history={this.props.history} />
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
