import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../../../../store/actions/auth';

import NavLogo from '../navlogo/NavLogo';
import NavItem from '../navitem/NavItem';

const Navbar = ({
  auth: { isAuthenticated, loading },
  user: { firstName, lastName },
  logout,
}) => {
  const authLinks = (
    <Fragment>
      <NavItem
        subtype='icon'
        url='/businesses'
        iconClasses='fas fa-store-alt'
        linkClasses='grey-text text-darken-2'
        text=' Businesses'
      />
      <NavItem
        subtype='icon'
        url='/profile'
        iconClasses='fas fa-user-circle'
        linkClasses='grey-text text-darken-2'
        text=' Profile'
      />
      <NavItem
        subtype='icon'
        url='/settings'
        iconClasses='fas fa-cog'
        linkClasses='grey-text text-darken-2'
        text=' Settings'
      />
      <li>
        <Link onClick={logout} to='/login' className='grey-text text-darken-2'>
          <i className='fas fa-sign-out-alt'></i> Logout
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem
        subtype='icon'
        url='/businesses'
        iconClasses='fas fa-store-alt'
        linkClasses='grey-text text-darken-2'
        text=' Businesses'
      />
      <NavItem
        subtype='icon'
        url='/register'
        iconClasses='fas fa-user-plus'
        linkClasses='grey-text text-darken-2'
        text=' Register'
      />
      <NavItem
        subtype='icon'
        url='/login'
        iconClasses='fas fa-sign-out-alt'
        linkClasses='grey-text text-darken-2'
        text=' Login'
      />
    </Fragment>
  );

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
        <ul className='right hide-on-med-and-down'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
