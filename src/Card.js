import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);

    // this.state.text = this.props.text;
    this.state = {
      open: false,
      buttonX: null,
      buttonY: null,
      styles: {
        display:"none",
        background: "red"
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
        background: "red",
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

  changeColor = (button) => {
    button.style.background = "#FFDAB9";
    button.style.borderColor = "#FFDAB9";
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
        <button ref="button" onClick={(event) => {this.onOpenModal(); this.changeColor(event.target);}}>{this.props.children}</button>
          <div className="modal" style={this.state.styles}>
            <button type="button" onClick={this.onCloseModal} className="close">&times;</button>
            <h2>{this.props.modalContent}</h2>
          </div>

      </div>
    );
  }
}

export default Card;
