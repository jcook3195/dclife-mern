import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavItem from '../navitem/NavItem';

const SideDrawer = ({ auth: { isAuthenticated, loading } }) => {
  const authLinks = <div>Auth Links</div>;
  const guestLinks = <div>Guest Links</div>;

  return (
    <ul className='sidenav' id='mobile-side-drawer'>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
      <NavItem subtype='standard' />
      <NavItem subtype='icon' />
      <NavItem subtype='profile' />
    </ul>
  );
};

SideDrawer.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SideDrawer);
