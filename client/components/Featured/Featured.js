import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Carousel from "nuka-carousel";

import "./Featured.scss";

const images = [
  "/Image/featured-lemon-candy.jpeg", 
  "/Image/featured-citrus-gummy.jpeg",
  "/Image/featured-french-candy.jpeg",
  "/Image/featured-mint-candy.jpeg",
  "/Image/featured-heart-gummy.jpeg",
];

class Featured extends React.Component {
  render() {
    const { candies } = this.props;
    if (!candies.length) {
      return <div>...Loading</div>;
    }
    const featured = [];
    while (featured.length < 5) {
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
          {/* <ul className="featured-items">
            <li>
              <Link to={`candy/${featured[0]?.id}`}>{featured[0]?.name}</Link>
            </li>
            <li>
              <Link to={`candy/${featured[1]?.id}`}>{featured[1]?.name}</Link>
            </li>
            <li>
              <Link to={`candy/${featured[0]?.id}`}>{featured[2]?.name}</Link>
            </li>
          </ul> */}
        </div>
        <div className="featured-text-container">
          <div className="text">Eat Sweet</div>
          <div className="text">Be Happy</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Featured);
