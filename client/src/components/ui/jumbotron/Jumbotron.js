import React from 'react';

import PropTypes from 'prop-types';

const Jumbotron = ({ title, subtitle }) => {
  return (
    <div className='jumbotron grey lighten-2'>
      <div className='container'>
        <div className='section'>
          <h1 className='pg-heading'>{title}</h1>
          <h2 className='pg-subheading'>{subtitle}</h2>
        </div>
      </div>
    </div>
  );
};

Jumbotron.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Jumbotron;
