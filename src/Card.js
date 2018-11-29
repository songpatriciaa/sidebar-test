import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.classes = {
      'mobileModal': true,
      'overlay': true,
      'overlayCenter': true
    }
    // this.state.text = this.props.text;
    this.state = {
      open: false,
      buttonX: null,
      buttonY: null,
      styles: {
        display:"none",
      }
    };
  }

  componentDidMount() {
    this.setState({
      buttonX: this.refs.button.left,
      buttonY: this.refs.button.top
    });
    console.log(this.state.buttonX);
    console.log(this.state.buttonY);
  }

  onOpenModal = () => {
    this.setState({
      open: true,
      styles: {
        display: "block"
      }
    });
  }

  onCloseModal = () => {
    this.setState({
      open:false,
      styles: {
        display: "none"
      }
    });
  }

  // changeColor = (button) => {
  //   button.style.background = "#FFDAB9";
  //   button.style.borderColor = "#FFDAB9";
  // }

  classNames = (classes) => {
    return Object.entries(classes)
      .filter(([key,value]) => value)
      .map(([key, value]) => key)
      .join(' ');
  }

  // getButtonPos = (button) => {
  //   this.setState({
  //     buttonX: button.left,
  //     buttonY: button.top
  //   });
  // }

  // () => {this.onOpenModal(); this.changeModalPos.bind(this,"modal1")}


  // <Modal style={this.state.styles} ref="modal1" open={this.state.open} onClose={(event) => {this.onCloseModal(event.target)}} center>
  //   <h2>Simple centered modal</h2>
  // </Modal>


  render() {
    return (
      <div className="Context">
        <button ref="button" onClick={(event) => this.onOpenModal()}>{this.props.children}</button>
          <div className="modal" style={this.state.styles}>
            <span type="button" onClick={this.onCloseModal} className="close">&times;</span>
              <div className="modalContent">{this.props.modalContent}</div>
          </div>

      </div>
    );
  }
}

export default Card;
