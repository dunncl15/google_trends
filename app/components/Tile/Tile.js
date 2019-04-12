import React, { Component } from 'react';
import './Tile.scss';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousText: '',
      currentText: '',
      charIndex: 0,
      intervalId: null,
      backgroundColor: props.color,
    };
  }

  componentDidMount() {
    this.animationHandler(this.props.text);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentText && !this.state.currentText) {
      clearInterval(this.state.intervalId);
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

  animateText(text) {
    const animal = this.capitilize(text);
    if (this.state.charIndex < animal.length) {
      this.setState(({ currentText, charIndex }) => ({
        currentText: (currentText += animal.charAt(charIndex)),
        charIndex: charIndex + 1,
      }));
    } else {
      this.reset();
    }
  }

  reset() {
    this.setState(({ currentText }) => ({
      previousText: currentText,
      currentText: '',
      charIndex: 0,
      backgroundColor: this.props.getNewColor(),
    }));
  }

  render() {
    const { width, height } = this.props;
    const { backgroundColor, currentText } = this.state;
    return (
      <div
        className="tile"
        style={{
          backgroundColor,
          height,
          width,
        }}
      >
        <span className="tile-text">{currentText}</span>
      </div>
    );
  }
}

export default Tile;
