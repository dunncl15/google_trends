import React, { Component } from 'react';
import animals from '../../../animal_names.json';
import Tile from '../Tile/Tile';
import ButtonRender from '../Buttons/ButtonRender';
import IconButton from '../Buttons/IconButton/IconButton';
import GridButton from '../Buttons/GridButton/GridButton';
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
      transitions: ['from-top', 'from-right', 'from-bottom', 'from-left'],
      showGridIcon: true,
    };
    this.getNewAnimal = this.getNewAnimal.bind(this);
    this.getNewColor = this.getNewColor.bind(this);
    this.getTransition = this.getTransition.bind(this);
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

  getTransition() {
    return this.randomizer(this.state.transitions);
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
          getTransition={this.getTransition}
        />
      );
    });
  }

  render() {
    return (
      <div className="grid">
        {/* <ButtonRender
          render={({ hovering, onEnter, onLeave }) => {
            <IconButton
              hovering={hovering}
              onEnter={onEnter}
              onLeave={onLeave}
              handleClick={this.toggleGrid}
              // handleClick={this.setGridSize}
            />;
          }}
        />
        <ButtonRender
          render={({ hovering, onEnter, onLeave }) => {
            <GridButton
              hovering={hovering}
              onEnter={onEnter}
              onLeave={onLeave}
              maxSize={this.state.maxSize}
              handleClick={this.setGridSize}
            />;
          }}
        /> */}
        {this.renderTiles()}
      </div>
    );
  }
}

export default Grid;
