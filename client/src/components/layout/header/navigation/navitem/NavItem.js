import React from 'react';
import PropTypes from 'prop-types';

import IconNavItem from './subtypes/IconNavItem';
import ProfileNavItem from './subtypes/ProfileNavItem';
import StandardNavItem from './subtypes/StandardNavItem';

const swapNavSubType = (subtype, url, iconClasses, text) => {
  switch (subtype) {
    case 'standard':
      return <StandardNavItem />;
    case 'profile':
      return <ProfileNavItem />;
    case 'icon':
      return <IconNavItem url={url} iconClasses={iconClasses} text={text} />;
    default:
      return <StandardNavItem />;
  }
};

const NavItem = ({ subtype, url, iconClasses, text }) => {
  return <li>{swapNavSubType(subtype, url, iconClasses, text)}</li>;
};

NavItem.propTypes = {
  subtype: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  iconClasses: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default NavItem;
