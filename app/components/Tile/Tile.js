import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      clearTimeout(this.timeout);
      const newAnimal = this.props.getNewAnimal();
      this.animationHandler(newAnimal);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    if (this.timeout) clearTimeout(this.timeout);
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
    const { intervalId } = this.state;
    const animal = this.capitilize(text);
    if (this.state.charIndex < animal.length) {
      this.setState(({ currentText, charIndex }) => ({
        currentText: (currentText += animal.charAt(charIndex)),
        charIndex: charIndex + 1,
      }));
    } else {
      clearInterval(intervalId);
      this.timeout = setTimeout(() => this.reset(), 1000);
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
    }));
  }

  render() {
    const { width, height } = this.props;
    const {
      previousColor,
      backgroundColor,
      currentText,
      transition,
    } = this.state;

    return (
      <div
        className="tile-container"
        style={{ height, width }}
        ref={node => (this.tile = node)}
      >
        <div className="tile" style={{ backgroundColor: previousColor }}>
          <span className="tile-text">
            {currentText}
            <span className="cursor" />
          </span>
        </div>
        <div className={`tile ${transition}`} style={{ backgroundColor }}>
          <span className="tile-text">
            {currentText}
            <span className="cursor" />
          </span>
        </div>
      </div>
    );
  }
}

Tile.propTypes = {
  getNewAnimal: PropTypes.func.isRequired,
  getNewColor: PropTypes.func.isRequired,
  getTransition: PropTypes.func.isRequired,
  height: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default Tile;
