import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCandy } from "../store/candy";

class CandyList extends React.Component {
  
  async componentDidMount(){
    await this.props.getCandy();

  }
  
  render(){
    const { candies } = this.props;
    return(
      <div>
        <ul>
          {candies.map((candy) => {
            return <Link to={`/candy/${candy.id}`} key={candy.id}><li >{candy.name}</li></Link>
          })}
        </ul>
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