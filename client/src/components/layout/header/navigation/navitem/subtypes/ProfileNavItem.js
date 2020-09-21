import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import devProfileImgSrc from '../../../../../../assets/images/profile-pic.jpg';

const ProfileNavItem = ({ url, text }) => {
  return (
    <Link to={url} className='profile-img-side-nav grey-text text-darken-2'>
      <img
        className='profile-img'
        src={devProfileImgSrc}
        alt={text + "' Dodge County Life Profile Picture"}
      />
      <span className='profile-name'>{text}</span>
    </Link>
  );
};

ProfileNavItem.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ProfileNavItem;
