import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavItem = ({ url, text }) => {
  return (
    <li>
      <Link to={url} className='grey-text text-darken-2'>
        {text}
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavItem;
