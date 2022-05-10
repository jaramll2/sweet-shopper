import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import QuickViewModal from "../QuickViewModal";

import "./CandyItem.scss";

class CandyItem extends Component {
  state = {
    modalOpen: false,
  };

  toggleModal = () => {
    this.setState((prev) => ({ modalOpen: !prev.modalOpen }));
  };

  render() {
    const { id, name, price, imageUrl } = this.props.candy;
    const { modalOpen } = this.state;

    return (
      <div className="candy-item" key={id}>
        <div className="image-container">
          <Link to={`/candy/${id}`}>
            <img src={imageUrl} />
          </Link>
          <div className="quick-add">
            <div variant="contained" onClick={this.toggleModal}>
              Quick View
            </div>
            <QuickViewModal
              candy={this.props.candy}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
            />
          </div>
        </div>
        <div className="details">
          <span>{name}</span>
          <span>${price}</span>
        </div>
      </div>
    );
  }
}

export default connect()(CandyItem);
