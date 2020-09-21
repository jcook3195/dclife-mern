import React from 'react';

import NavItem from '../navitem/NavItem';

const SideDrawer = () => {
  return (
    <ul className='sidenav' id='mobile-side-drawer'>
      <NavItem subtype='standard' />
      <NavItem subtype='icon' />
      <NavItem subtype='profile' />
    </ul>
  );
};

export default SideDrawer;
