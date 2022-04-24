import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCandy } from "../../store/candy";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Footer from "../Footer";
import CandyItem from "../CandyItem";

import "./CandyList.scss";

class CandyList extends React.Component {
  async componentDidMount() {
    await this.props.getCandy();
  }

  render() {
    const { candies } = this.props;

    return (
      <div className="shop">
        <div className="shop-header">
          <div className="shop-name">Category</div>
        </div>
        <div className="shop-body">
          <div className="category-container">
            <div>Candy</div>
            <div>Caramel</div>
            <div>Chocolate</div>
            <div>Gummy</div>
          </div>
          <div className="item-container">
            {candies.map((candy) => (
              <CandyItem key={candy.id} candy={candy} />
            ))}
          </div>
        </div>
        <div className="page"> 1 2 3 </div>
        <Footer />
      </div>
    );
  }
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  background: "#ffffff",
  transform: "translate(-50%, -50%)",
  minWidth: "40%",
  maxWidth: "80%",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCandy: async () => {
      return dispatch(getCandy());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandyList);
