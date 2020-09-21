import React, { Fragment } from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <section id='main'>
        <div className='container'>{props.children}</div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Layout;
