import React from 'react';

import NavLogo from '../navlogo/NavLogo';

const Navbar = () => {
  return (
    <nav className='white'>
      <div className='nav-wrapper'>
        <NavLogo />
        <a
          href='#'
          data-target='mobile-side-drawer'
          className='sidenav-trigger red-text text-darken-2'
        >
          <i className='material-icons'>menu</i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
