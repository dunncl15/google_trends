import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';

const IconButton = ({ show, handleClick, children }) => {
  return (
    <button className="icon" onClick={handleClick}>
      {show ? children : null}
    </button>
  );
};

IconButton.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default IconButton;
