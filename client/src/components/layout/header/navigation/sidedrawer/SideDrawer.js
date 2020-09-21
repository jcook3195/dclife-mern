import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../../../../store/actions/auth';

import NavItem from '../navitem/NavItem';

const SideDrawer = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <NavItem subtype='profile' url='/profile' text='Jordan Cook' />
      <NavItem
        subtype='icon'
        url='/businesses'
        iconClasses='fas fa-store-alt'
        text=' Businesses'
      />
      <NavItem
        subtype='icon'
        url='/profile'
        iconClasses='fas fa-user-circle'
        text=' Profile'
      />
      <NavItem
        subtype='icon'
        url='/settings'
        iconClasses='fas fa-cog'
        text=' Settings'
      />
      <li>
        <Link onClick={logout} to='/login'>
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
        text=' Businesses'
      />
      <NavItem
        subtype='icon'
        url='/register'
        iconClasses='fas fa-user-plus'
        text=' Register'
      />
      <NavItem
        subtype='icon'
        url='/login'
        iconClasses='fas fa-sign-out-alt'
        text=' Login'
      />
    </Fragment>
  );

  return (
    <ul className='sidenav' id='mobile-side-drawer'>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </ul>
  );
};

SideDrawer.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(SideDrawer);
