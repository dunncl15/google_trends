import React from 'react';
import PropTypes from 'prop-types';

import './PalettePicker.scss';

const PalettePicker = ({ palettes, handleClick, activeI }) => {
  return (
    <div className="palettes">
      <span>Palettes: </span>
      {palettes.map((p, i) => {
        return (
          <div
            key={`row-${i}`}
            className={`palette-row ${i === activeI ? 'active' : ''}`}
          >
            {p.map(c => (
              <span
                key={c}
                className="palette-cell"
                onClick={() => handleClick(i)}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

PalettePicker.propTypes = {
  palettes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  handleClick: PropTypes.func.isRequired,
  activeI: PropTypes.number.isRequired,
};

export default PalettePicker;
