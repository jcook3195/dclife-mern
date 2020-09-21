import React from 'react';
import { Link } from 'react-router-dom';

import dcLifeLogo from '../../../../../assets/images/logo.png';

const NavLogo = () => {
  return (
    <Link to='/' className='brand-logo grey-text text-darken-2'>
      <img src={dcLifeLogo} />
    </Link>
  );
};

export default NavLogo;
