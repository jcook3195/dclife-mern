import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Jumbotron from '../ui/jumbotron/Jumbotron';
import CardLinks from './cardlinks/CardLinks';
import { getBusinesses } from '../../store/actions/business';

const Businesses = ({ getBusinesses, business: { businesses, loading } }) => {
  useEffect(() => {
    getBusinesses();
  }, [getBusinesses]);

  return (
    <Fragment>
      <Jumbotron
        title='Local Businesses'
        subtitle='Some text explaining a little more about this title.'
      />
      <div className='container'>
        {loading ? (
          <h1>Loading...</h1>
        ) : businesses.length > 0 ? (
          <CardLinks businesses={businesses} />
        ) : (
          <h2>No Businesses match this criteria.</h2>
        )}
      </div>

      {/* add business modal */}
    </Fragment>
  );
};

Businesses.propTypes = {
  getBusinesses: PropTypes.func.isRequired,
  business: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  business: state.business,
});

export default connect(mapStateToProps, { getBusinesses })(Businesses);
