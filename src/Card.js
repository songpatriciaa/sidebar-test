import React, { Component } from "react";
import "./Card.css";
import ReactDOM from "react-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.modalRef = React.createRef();
    this.classes = {
      "mobileModal": true,
      "overlay": true,
      "overlayCenter": true
    }
    this.state = {
      open: false,
      buttonX: null,
      buttonY: null,
      styles: {
        display:"none",
      },
      labelStyles: {
        borderBottom: "1.5px solid #708090",
        marginBottom: "3px",
        textTransform: "capitalize",
      },
      cardSiblings: []
    };
  }

  componentDidMount() {
    this.setState({
      buttonX: this.refs.button.left,
      buttonY: this.refs.button.top
    });
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  onOpenModal = () => {
    if (this.state.open === true) {
      this.setState({
        open: false,
        styles: {
          display: "none"
        }
      });
    }
    else {
      this.setState({
        open: true,
        styles: {
          display: "block"
        }
      });
    }

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
      .join(" ");
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (window.matchMedia("(max-width: 415px)").matches) {
      console.log("this is true");
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({
          open: false,
          styles: {
            display: "none"
          }
        });
      }
    }
  }

  render() {
    return (
      <div className="Context">
        <button ref="button" onClick={(event) => this.onOpenModal()}>{this.props.children}</button>
          <div className="modal" style={this.state.styles}>
              <div ref={this.setWrapperRef} className="modalContent">
              <span type="button" onClick={this.onCloseModal} className="close">&times;</span>
              <h2 style={this.state.labelStyles}>{this.props.children}</h2>
              {this.props.extraImage}
              {this.props.modalContent}
              {this.props.extraLink}
              </div>
          </div>

      </div>
    );
  }
}

export default Card;
