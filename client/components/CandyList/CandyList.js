import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCandy } from "../../store/candy";

import Footer from "../Footer";

import "./CandyList.scss";

class CandyList extends React.Component {
  
  async componentDidMount(){
    await this.props.getCandy();

  }
  
  render(){
    const { candies } = this.props;
    
    return(
      <div className="shop">
        <div className="shop-header">
          <div className="shop-name">Candy</div>
        </div>
        <div className="shop-body">
          <div className="category-container">
            <div>Candy</div>
            <div>Caramel</div>
            <div>Chocolate</div>
            <div>Gummy</div>
          </div>
          <div className="item-container">
            {/* <ul className="item"> */}
              {candies.map((candy) => {
                return (
                  <div className="item" key={candy.id}>
                    <div className="image" >
                      <Link to={`/candy/${candy.id}`}>
                        <div>image</div>
                      </Link>
                    </div>
                    <div className="details">
                      <div>{candy.name}</div>
                      <div>${candy.price}</div>
                    </div>
                    <div className="quick-add">
                      <div>Quick Add</div>
                    </div>
                  </div>
                )
              })}
            {/* </ul> */}
          </div>
        </div>
        <div className="page"> 1 2 3 </div>
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCandy: async () => {
      return dispatch(getCandy());
    }
  }
}

export default connect(state => state, mapDispatchToProps)(CandyList);
