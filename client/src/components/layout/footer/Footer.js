import React from 'react';

import FooterNav from './navigation/FooterNav';
import SiteCredits from './credits/SiteCredits';

const Footer = () => {
  return (
    <section id='footer'>
      <footer className='page-footer white z-depth-4'>
        <div className='container'>
          <div className='row'>
            <div className='col l4 offset-l2 s12'>
              <h5 className='grey-text text-darken-3'>Navigation</h5>
              <FooterNav />
            </div>
          </div>
        </div>
        <SiteCredits />
      </footer>
    </section>
  );
};

export default Footer;
