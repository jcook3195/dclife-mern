import React from 'react';
import { Link } from 'react-router-dom';

const SiteCredits = () => {
  const year = new Date().getFullYear();

  return (
    <div className='footer-copyright'>
      <div className='container grey-text text-darken-2 center'>
        <Link
          to='https://triplecdigital.com'
          target='_blank'
          className='red-text text-darken-2'
        >
          &copy; {year} Triple C Digital, LLC
        </Link>
      </div>
    </div>
  );
};

export default SiteCredits;
