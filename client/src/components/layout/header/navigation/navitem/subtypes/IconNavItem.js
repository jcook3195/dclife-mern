import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const IconNavItem = ({ url, iconClasses, text }) => {
  return (
    <Link to={url}>
      <i className={iconClasses}></i>
      {text}
    </Link>
  );
};

IconNavItem.propTypes = {
  url: PropTypes.string.isRequired,
  iconClasses: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default IconNavItem;
