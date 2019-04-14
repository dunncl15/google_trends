import React, { Component } from 'react';
import IconButton from '../Buttons/IconButton/IconButton';
import PalettePicker from '../Buttons/PalettePicker/PalettePicker';

import './Sidebar.scss';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      show,
      handleClick,
      handleSelect,
      size,
      palettes,
      selectPalette,
    } = this.props;
    return (
      <aside className={`sidebar ${show ? 'show' : ''}`}>
        <IconButton show={show} handleClick={handleClick}>
          <i className="fas fa-times" />
        </IconButton>
        <h3>Settings</h3>
        <label htmlFor="grid-select">Grid size:</label>
        <select id="grid-select" onChange={handleSelect} value={size}>
          <option value={1}>1x1</option>
          <option value={2}>2x2</option>
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5} defaultValue>
            5x5
          </option>
          <option value={6}>6x6</option>
          <option value={7}>7x7</option>
          <option value={8}>8x8</option>
          <option value={9}>9x9</option>
          <option value={10}>10x10</option>
        </select>
        <PalettePicker palettes={palettes} handleClick={selectPalette} />
      </aside>
    );
  }
}

export default Sidebar;
