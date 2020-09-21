import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ classes, text }) => {
  return <button className={classes}>{text}</button>;
};

Button.propTypes = {
  classes: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
