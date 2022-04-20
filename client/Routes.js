import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm/AuthForm";
import Home from "./components/Home";
import CandyList from "./components/CandyList";
import Candy from "./components/Candy";
import { me } from "./store";
import Cart from "./components/Cart";
import { guestCart } from "./store/guestCart";
import Confirmation from "./components/Confirmation/Confirmation";

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    this.props.loadInitialData();

    if (!this.props.isLoggedIn) {
      this.props.loadGuestCart();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Route exact path="/" component={Home} />
        {!isLoggedIn && (
          <>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </>
        )}
        <Route path="/candy/:id" component={Candy} />
        <Route path="/candy" component={CandyList} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Redirect to="/" />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadGuestCart() {
      dispatch(guestCart());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
