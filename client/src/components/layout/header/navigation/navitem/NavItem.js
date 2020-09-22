import React from 'react';
import PropTypes from 'prop-types';

import IconNavItem from './subtypes/IconNavItem';
import ProfileNavItem from './subtypes/ProfileNavItem';
import StandardNavItem from './subtypes/StandardNavItem';

const swapNavSubType = (subtype, url, iconClasses, linkClasses, text) => {
  switch (subtype) {
    case 'standard':
      return <StandardNavItem />;
    case 'profile':
      return <ProfileNavItem url={url} text={text} />;
    case 'icon':
      return (
        <IconNavItem
          url={url}
          iconClasses={iconClasses}
          linkClasses={linkClasses}
          text={text}
        />
      );
    default:
      return <StandardNavItem />;
  }
};

const NavItem = ({ subtype, url, iconClasses, linkClasses, text }) => {
  return (
    <li>{swapNavSubType(subtype, url, iconClasses, linkClasses, text)}</li>
  );
};

NavItem.propTypes = {
  subtype: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  iconClasses: PropTypes.string,
  linkClasses: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default NavItem;
