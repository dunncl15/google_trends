import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../Buttons/IconButton/IconButton';
import GridSizeSelector from '../Buttons/GridSizeSelector/GridSizeSelector';
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
      activePaletteIndex,
    } = this.props;
    return (
      <aside className={`sidebar ${show ? 'show' : ''}`}>
        <IconButton show={show} handleClick={handleClick}>
          <i className="fas fa-arrow-left" />
        </IconButton>
        <h3>Settings</h3>
        <GridSizeSelector handleSelect={handleSelect} size={size} />
        <PalettePicker
          palettes={palettes}
          handleClick={selectPalette}
          activeI={activePaletteIndex}
        />
      </aside>
    );
  }
}

Sidebar.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  selectPalette: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  activePaletteIndex: PropTypes.number.isRequired,
  palettes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default Sidebar;
