import React, { Component } from 'react';
import animals from '../../../animal_names.json';
import Tile from '../Tile/Tile';
import Button from '../Button/Button';
import './Grid.scss';

class Grid extends Component {
  constructor() {
    super();
    this.state = {
      gridSize: 5,
      maxSize: 10,
      animals,
      colors: [
        'rgb(250, 187, 5)', // yellow
        'rgb(52, 168, 82)', // green
        'rgb(234, 67, 53)', // red
        'rgb(66, 133, 244)', // blue
      ],
      animalsInGrid: [],
    };
    this.getNewAnimal = this.getNewAnimal.bind(this);
    this.getNewColor = this.getNewColor.bind(this);
    this.setGridSize = this.setGridSize.bind(this);
  }

  componentDidMount() {
    this.setAnimalsInGrid();
  }

  randomizer(arr) {
    const i = Math.floor(Math.random() * arr.length);
    return arr[i];
  }

  getNewAnimal() {
    return this.randomizer(animals);
  }

  getNewColor() {
    return this.randomizer(this.state.colors);
  }

  setGridSize(size) {
    this.setState(() => ({ gridSize: size }));
  }

  setAnimalsInGrid() {
    const { animals, gridSize } = this.state;
    const size = gridSize ** 2;
    const arr = [];
    for (let i = 0; i < size; i++) {
      const animal = this.randomizer(animals);
      arr.push(animal);
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
          width={`${(1 / gridSize) * 100}%`}
          height={`${(1 / gridSize) * 100}%`}
          getNewAnimal={this.getNewAnimal}
          getNewColor={this.getNewColor}
        />
      );
    });
  }

  render() {
    return (
      <div className="grid">
        <Button handleClick={this.setGridSize} maxSize={this.state.maxSize} />
        {this.renderTiles()}
      </div>
    );
  }
}

export default Grid;
