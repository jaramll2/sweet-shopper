import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Carousel from "nuka-carousel";

import "./Featured.scss";

const images = [
  "./Image/featured-lemon-candy.jpeg", 
  "./Image/featured-citrus-gummy.jpeg",
  "./Image/featured-french-candy.jpeg",
];

class Featured extends React.Component {
  render() {
    const { candies } = this.props;
    if (!candies.length) {
      return <div>...Loading</div>;
    }
    const featured = [];
    while (featured.length < 6) {
      const randomNumber = Math.floor(Math.random() * candies.length);
      const randomCandy = candies[randomNumber];
      if (!(randomCandy in featured)) {
        featured.push(randomCandy);
      }
    }
    return (
      <div className="featured">
        <div className="featured-items-container">
          <Carousel>
            {featured.map((item) => (
              <div key={item.name} className="featured-item">
                <img src={images[Math.floor(Math.random() * images.length)]} alt="random" />
                <div className="featured-item-text">
                  <span className="featured-item-name">{item.name}</span>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="featured-text-container">
          <div>text</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Featured);
