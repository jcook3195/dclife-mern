import React from 'react';
import PropTypes from 'prop-types';

const InputSubmit = ({ classes, text }) => {
  return <input type='submit' className={classes} value={text} />;
};

InputSubmit.propTypes = {
  classes: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default InputSubmit;
