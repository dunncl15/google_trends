import React, { Component } from 'react';
import animals from '../../../animal_names.json';
import Tile from '../Tile/Tile';
import SideBar from '../Sidebar/Sidebar';
import IconButton from '../Buttons/IconButton/IconButton';
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
      showSidebar: false,
    };
    this.getNewAnimal = this.getNewAnimal.bind(this);
    this.getNewColor = this.getNewColor.bind(this);
    this.getTransition = this.getTransition.bind(this);
    this.setGridSize = this.setGridSize.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  componentDidMount() {
    this.setAnimalsInGrid();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gridSize !== this.state.gridSize)
      this.setAnimalsInGrid(this.state.gridSize);
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

  setGridSize(e) {
    const { value } = e.target;
    this.setState(() => ({ gridSize: parseInt(value) }));
  }

  toggleSidebar() {
    this.setState(({ showSidebar }) => ({ showSidebar: !showSidebar }));
  }

  setAnimalsInGrid(gridSize = 5) {
    const { animals } = this.state;
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
    const { showSidebar, gridSize } = this.state;
    return (
      <div className="wrapper">
        <IconButton show={!showSidebar} handleClick={this.toggleSidebar}>
          <i className="fas fa-bars" />
        </IconButton>
        <SideBar
          show={showSidebar}
          handleClick={this.toggleSidebar}
          handleSelect={this.setGridSize}
          size={gridSize}
        />
        <div className="grid">{this.renderTiles()}</div>
      </div>
    );
  }
}

export default Grid;
