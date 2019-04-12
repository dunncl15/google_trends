import React, { Component } from 'react';
import './Button.scss';

class Button extends Component {
  constructor() {
    super();
    this.state = {
      hovering: false,
    };
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover() {
    this.setState(({ hovering }) => ({ hovering: !hovering }));
  }

  render() {
    const { handleClick, maxSize } = this.props;
    return (
      <>
        {!this.state.hovering ? (
          <div onMouseEnter={this.handleHover}>
            <i className="fas fa-th" />
          </div>
        ) : (
          <div />
        )}
      </>
    );
  }
}

export default Button;
