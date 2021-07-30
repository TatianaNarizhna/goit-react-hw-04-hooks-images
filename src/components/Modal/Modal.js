import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  onOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.onOverlayClick}>
        <div className="Modal">
          <img src={this.props.modalImg} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
};
