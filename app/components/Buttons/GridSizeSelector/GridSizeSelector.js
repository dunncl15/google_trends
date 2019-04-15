import React from 'react';
import PropTypes from 'prop-types';
import './GridSizeSelector.scss';

const GridSizeSelector = ({ handleSelect, size }) => {
  return (
    <div className="grid-select-wrapper">
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
    </div>
  );
};

GridSizeSelector.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};

export default GridSizeSelector;
