import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Carousel from "nuka-carousel";

import "./Featured.scss";

class Featured extends React.Component {
  render() {
    const { candies } = this.props;
    if (!candies.length) {
      return <div>...Loading</div>;
    }
    const featured = [];
    while (featured.length < 3) {
      const random = Math.floor(Math.random() * candies.length);
      if (!(candies[random] in featured)) {
        featured.push(candies[random]);
      }
    }
    return (
      <div className="featured">
        <div className="featured-items-container">
          <Carousel adaptiveHeight={true}>
            {featured.map((item) => (
              <div key={item.name} className="featured-item">
                {item.name}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Featured);
