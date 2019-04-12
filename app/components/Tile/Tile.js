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
    };
  }

  componentDidMount() {
    const intervalId = setInterval(() => this.animateText(), 500);
    this.setState(() => ({ intervalId }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.text && !this.state.text) {
      clearInterval(this.state.intervalId);
    }
  }

  capitilize(text) {
    const first = text.slice(0, 1).toUpperCase();
    return first + text.slice(1);
  }

  animateText() {
    const animal = this.capitilize(this.props.text);
    if (this.state.charIndex < animal.length) {
      this.setState(({ currentText, charIndex }) => ({
        currentText: (currentText += animal.charAt(charIndex)),
        charIndex: charIndex + 1,
      }));
    } else {
      // ANIMATION COMPLETE
      // Clear current interval, reset state, set previousText to currentText
      // Get new animal name
      // Get new tile color
      // Transition tile color
    }
  }

  render() {
    const { color, width, height } = this.props;
    const { currentText } = this.state;
    return (
      <div
        className="tile"
        style={{
          backgroundColor: color,
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
