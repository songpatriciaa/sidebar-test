import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);

    // this.state.text = this.props.text;
    this.state = {
      open: false,
      buttonX: null,
      buttonY: null
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  }

  onCloseModal = (event) => {
    if (event.className.baseVal) {
      this.setState({ open: false });
    }

  };

  changeColor = (button) => {
    button.style.background = "#FFDAB9";
    button.style.borderColor = "#FFDAB9";
  }

  getButtonPos = (button) => {
    this.setState({
      buttonX: button.left,
      buttonY: button.top
    });
  }

  changeModalPos = (refName,event) => {
    console.log("hi");
    if (this.state.buttonY) {
      this.refs[refName].style.color = "blue";
    }
  }

  // () => {this.onOpenModal(); this.changeModalPos.bind(this,"modal1")}

  render() {
    return (
      <div className="Context">
        <button onClick={(event) => {this.onOpenModal(); this.changeColor(event.target); this.getButtonPos(event.target);}}>{this.props.children}</button>
        <Modal ref="modal1" open={this.state.open} onOpen={() => {this.changeModalPos.bind(this,"modal1")}} onClose={(event) => {this.onCloseModal(event.target)}} center>
          <h2>Simple centered modal</h2>
        </Modal>
      </div>
    );
  }
}

export default Card;
