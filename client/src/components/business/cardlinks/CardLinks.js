import React from 'react';
import PropTypes from 'prop-types';

import Card from './cards/Card';

const CardLinks = ({ businesses }) => {
  return (
    <div className='card-links section'>
      {/* add search */}

      {/* add filter */}

      <h2 className='center-align section-header'>Businesses</h2>
      {businesses.length > 0 ? (
        businesses.map((business) => (
          <Card key={business._id} business={business} />
        ))
      ) : (
        <h3>No Businesses match this criteria.</h3>
      )}
    </div>
  );
};

CardLinks.propTypes = {
  businesses: PropTypes.array.isRequired,
};

export default CardLinks;
