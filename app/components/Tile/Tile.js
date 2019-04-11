import React, { Component } from 'react';
import './Tile.scss';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { color, width, height, text } = this.props;
    return (
      <div
        className="tile"
        style={{
          backgroundColor: color,
          height,
          width,
        }}
      >
        {text}
      </div>
    );
  }
}

export default Tile;
