import React, { Component } from 'react';
import animals from '../../../animal_names.json';
import colors from '../../../colors.json';
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
      fontSizes: {
        1: '9vw',
        2: '6vw',
        3: '3vw',
        4: '2.5vw',
        5: '2vw',
        6: '1.75vw',
        7: '1.5vw',
        8: '1.25vw',
        9: '1vw',
        10: '1vw',
      },
      animals,
      paletteIndex: 0,
      animalsInGrid: [],
      transitions: ['from-top', 'from-right', 'from-bottom', 'from-left'],
      showSidebar: false,
    };
    this.getNewAnimal = this.getNewAnimal.bind(this);
    this.getNewColor = this.getNewColor.bind(this);
    this.getTransition = this.getTransition.bind(this);
    this.setGridSize = this.setGridSize.bind(this);
    this.selectPalette = this.selectPalette.bind(this);
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
    const { paletteIndex } = this.state;
    return this.randomizer(colors[paletteIndex]);
  }

  getTransition() {
    return this.randomizer(this.state.transitions);
  }

  setGridSize(e) {
    const { value } = e.target;
    this.setState(() => ({ gridSize: parseInt(value) }));
  }

  selectPalette(i) {
    this.setState(() => ({ paletteIndex: i }));
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
    const { animalsInGrid, gridSize, fontSizes } = this.state;
    const fontSize = fontSizes[gridSize];

    return animalsInGrid.map((name, i) => {
      return (
        <Tile
          key={`cell-${i}`}
          text={name}
          width={`${(1 / gridSize) * 100}%`}
          height={`${(1 / gridSize) * 100}%`}
          fontSize={fontSize}
          getNewAnimal={this.getNewAnimal}
          getNewColor={this.getNewColor}
          getTransition={this.getTransition}
        />
      );
    });
  }

  render() {
    const { showSidebar, gridSize, paletteIndex } = this.state;
    return (
      <div className="wrapper">
        <IconButton show={!showSidebar} handleClick={this.toggleSidebar}>
          <i className="fas fa-bars" />
        </IconButton>
        <SideBar
          show={showSidebar}
          handleClick={this.toggleSidebar}
          handleSelect={this.setGridSize}
          selectPalette={this.selectPalette}
          size={gridSize}
          palettes={colors}
          activePaletteIndex={paletteIndex}
        />
        <div className="grid">{this.renderTiles()}</div>
      </div>
    );
  }
}

export default Grid;
