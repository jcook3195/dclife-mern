import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Card = ({
  business: {
    businessName,
    businessCategory,
    businessMainImage,
    contactEmail,
    contactPhone,
    websiteUrl,
    about,
    additionalImages,
    social: {
      facebook,
      instagram,
      twitter,
      youtube,
      pinterest,
      linkedin,
      snapchat,
    },
  },
}) => {
  return (
    <div className='row'>
      <div className='col s12 m6'>
        <div className='card img-ab'>
          <div className='card-image'>
            <img
              src={businessMainImage}
              alt={`Main business image for ${businessName}`}
            />
            <div className='card-tags'>
              <span className='tag red darken-1'>Tag 1</span>
              <span className='tag red darken-1'>Tag 2</span>
              <span className='tag red darken-1'>Tag 3</span>
            </div>
            <span className='card-title'>{businessName}</span>
            <div className='card-review-stars'>
              <i className='fas fa-star rev-star amber-text text-darken-1'></i>
              <i className='fas fa-star rev-star amber-text text-darken-1'></i>
              <i className='fas fa-star rev-star amber-text text-darken-1'></i>
              <i className='fas fa-star rev-star amber-text text-darken-1'></i>
              <i className='fas fa-star-half rev-star amber-text text-darken-1'></i>
            </div>
            <a
              href='#!'
              className='btn-floating halfway-fab waves-effect waves-light red'
            >
              <i className='far fa-heart'></i>
            </a>
          </div>
          <div className='card-content'>
            <h3 className='b-card-cat'>{businessCategory}</h3>
            <div className='left-align'>
              <a
                href='#businessModal'
                className='view-detail-link red darken-1 waves-effect waves-light modal-trigger'
              >
                View Business <i className='fas fa-arrow-right'></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  business: PropTypes.object.isRequired,
};

export default Card;
