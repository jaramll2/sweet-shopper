import React from "react";

import "./Hero.scss";

export default () => {
  return (
    <div className="hero">
      <div className="hero-img-container">
        <img className="hero-img" src="./hero-img.png" />
      </div>
      <span className="hero-title">SWEET SHOPPER</span>
    </div>
  );
};
