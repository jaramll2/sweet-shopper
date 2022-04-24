import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import "./CandyItem.scss";

class CandyItem extends Component {
  state = {
    modalOpen: false,
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const { modalOpen } = this.state;
    const { id, name, price } = this.props.candy;

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
          <div variant="contained" onClick={this.handleOpen}>
            Quick Add
          </div>
          <Modal open={modalOpen} onClose={this.handleClose}>
            <div className="candy-modal">asdfasdf</div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect()(CandyItem);
