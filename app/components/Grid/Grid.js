import React, { Component } from 'react';
import animals from '../../../animal_names.json';
import Tile from '../Tile/Tile';
import './Grid.scss';

class Grid extends Component {
  constructor() {
    super();
    this.state = {
      gridSize: 5,
      animals,
      colors: [
        'rgb(250, 187, 5)', // yellow
        'rgb(52, 168, 82)', // green
        'rgb(234, 67, 53)', // red
        'rgb(66, 133, 244)', // blue
      ],
      animalsInGrid: [],
    };
  }

  componentDidMount() {
    this.setAnimalsInGrid();
  }

  handleChange(key) {
    const { [key]: property } = this.state;
    const i = Math.floor(Math.random() * property.length);
    return property[i];
  }

  setAnimalsInGrid() {
    const { animals, gridSize } = this.state;
    const size = gridSize ** 2;
    const arr = [];
    for (var i = 0; i < size; i++) {
      const index = Math.floor(Math.random() * animals.length);
      arr.push(animals[index]);
    }
    this.setState(() => ({ animalsInGrid: arr }));
  }

  renderTiles() {
    const { animalsInGrid, gridSize } = this.state;
    return animalsInGrid.map((name, i) => {
      return (
        <Tile
          key={`cell-${i}`}
          text={name}
          color={this.handleChange('colors')}
          width={window.innerWidth / gridSize}
          height={window.innerHeight / gridSize}
        />
      );
    });
  }

  render() {
    return <div className="grid">{this.renderTiles()}</div>;
  }
}

export default Grid;
