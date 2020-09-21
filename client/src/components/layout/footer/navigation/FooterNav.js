import React from 'react';

import NavItem from './navitem/NavItem';

const FooterNav = () => {
  return (
    <ul>
      <NavItem url='/grow-your-business' text='Grow Your Business' />
      <NavItem url='/blog' text='Blog' />
      <NavItem url='/community-resources' text='Community Resources' />
      <NavItem url='/privacy-policy' text='Privacy Policy' />
    </ul>
  );
};

export default FooterNav;
