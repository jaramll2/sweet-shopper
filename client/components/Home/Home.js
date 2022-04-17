import React from "react";
import { connect } from "react-redux";

import Hero from "../Hero";

import "./Home.scss";

export const Home = (props) => {
  return (
    <div className="home">
      <Hero />
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
