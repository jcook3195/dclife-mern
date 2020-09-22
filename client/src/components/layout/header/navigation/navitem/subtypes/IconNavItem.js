import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const IconNavItem = ({ url, iconClasses, linkClasses, text }) => {
  return (
    <Link to={url} className={linkClasses}>
      <i className={iconClasses}></i>
      {text}
    </Link>
  );
};

IconNavItem.propTypes = {
  url: PropTypes.string.isRequired,
  iconClasses: PropTypes.string.isRequired,
  linkClasses: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default IconNavItem;
