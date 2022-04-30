import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import './Featured.scss';

class Featured extends React.Component {
  render () {
    const { candies } = this.props
    const featured = []
    for (let i = 0; i < 3; i++) {
      featured.push(candies[Math.floor(Math.random()*3)])
    }
    if (featured.length === 0) {
      return <div>...Loading</div>
    }
    console.log('featured', featured)
    return (
      <div className="featured">
        Featured Sweets
        <ul className="featured-items">
          <li><Link to={`candy/id/${featured[0]?.id}`}>{featured[0]?.name}</Link></li>
          <li><Link to={`candy/id/${featured[1]?.id}`}>{featured[1]?.name}</Link></li>
          <li><Link to={`candy/id/${featured[0]?.id}`}>{featured[2]?.name}</Link></li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Featured)