import React, { Component } from 'react';
import './Tile.scss';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentText: '',
      charIndex: 0,
      intervalId: null,
      previousColor: '',
      backgroundColor: props.getNewColor(),
      previousTransition: '',
      transition: '',
    };
  }

  componentDidMount() {
    this.animationHandler(this.props.text);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentText && !this.state.currentText) {
      const newAnimal = this.props.getNewAnimal();
      this.animationHandler(newAnimal);
    }
  }

  animationHandler(text) {
    const intervalId = setInterval(() => this.animateText(text), 500);
    this.setState(() => ({ intervalId }));
  }

  capitilize(text) {
    const first = text.slice(0, 1).toUpperCase();
    return first + text.slice(1);
  }

  getUniqueValue(key, helper) {
    const { [key]: prop } = this.state;
    let newVal = helper();
    while (prop === newVal) {
      newVal = helper();
    }
    return newVal;
  }

  animateText(text) {
    const animal = this.capitilize(text);
    if (this.state.charIndex < animal.length) {
      this.setState(({ currentText, charIndex }) => ({
        currentText: (currentText += animal.charAt(charIndex)),
        charIndex: charIndex + 1,
      }));
    } else {
      this.setState(
        () => ({ doneTyping: true }),
        () => {
          clearInterval(this.state.intervalId);
          setTimeout(() => this.reset(), 1000);
        }
      );
    }
  }

  reset() {
    const { getTransition, getNewColor } = this.props;
    this.setState(({ backgroundColor, transition }) => ({
      currentText: '',
      charIndex: 0,
      previousColor: backgroundColor,
      backgroundColor: this.getUniqueValue('backgroundColor', getNewColor),
      previousTransition: transition,
      transition: this.getUniqueValue('transition', getTransition),
      doneTyping: false,
    }));
  }

  render() {
    const { width, height } = this.props;
    const {
      previousColor,
      backgroundColor,
      currentText,
      doneTyping,
      transition,
    } = this.state;

    return (
      <div className="tile-container" style={{ height, width }}>
        <div
          className={`tile ${!doneTyping ? 'current' : ''}`}
          style={{ backgroundColor: previousColor }}
        >
          <span className="tile-text">{currentText}</span>
        </div>
        <div className={`tile ${transition}`} style={{ backgroundColor }}>
          <span className="tile-text">{currentText}</span>
        </div>
      </div>
    );
  }
}

export default Tile;
