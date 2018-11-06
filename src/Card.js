import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);

    // this.state.text = this.props.text;
    this.state = {
      open: false
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="Context">
        <button onClick={this.onOpenModal}>{this.props.children}</button>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <h2>Simple centered modal</h2>
        </Modal>
      </div>
    );
  }
}

export default Card;
