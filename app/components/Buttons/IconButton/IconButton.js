import React from 'react';
import './IconButton.scss';

const IconButton = ({ show, handleClick, children }) => {
  return (
    <button className="icon" onClick={handleClick}>
      {show ? children : null}
    </button>
  );
};

export default IconButton;
