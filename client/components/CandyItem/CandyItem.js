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
    const { id, name, price } = this.props.candy;
    const { modalOpen } = this.state;

    return (
      <div className="candy-item" key={id}>
        <div className="image">
          <Link to={`/candy/${id}`}>
            <div>image</div>
          </Link>
        </div>
        <div className="details">
          <div>{name}</div>
          <div>${price}</div>
        </div>
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
    );
  }
}

export default connect()(CandyItem);
