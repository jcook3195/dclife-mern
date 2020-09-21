import React from 'react';

import NavBar from './navigation/navbar/Navbar';
import SideDrawer from './navigation/sidedrawer/SideDrawer';

const Header = () => {
  return (
    <section id='header'>
      <NavBar />
      <SideDrawer />
    </section>
  );
};

export default Header;
