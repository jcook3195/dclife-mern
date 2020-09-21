import React from 'react';

import IconNavItem from './subtypes/IconNavItem';
import ProfileNavItem from './subtypes/ProfileNavItem';
import StandardNavItem from './subtypes/StandardNavItem';

const swapNavSubType = (subtype) => {
  switch (subtype) {
    case 'standard':
      return <StandardNavItem />;
    case 'profile':
      return <ProfileNavItem />;
    case 'icon':
      return <IconNavItem />;
    default:
      return <StandardNavItem />;
  }
};

const NavItem = (props) => {
  return <li>{swapNavSubType(props.subtype)}</li>;
};

export default NavItem;
