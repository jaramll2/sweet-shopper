import React from "react";
import { connect } from "react-redux";
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
            return <li key={candy.id}>{candy.name}</li>
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