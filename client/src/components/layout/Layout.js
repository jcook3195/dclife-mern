import React, { Fragment } from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <section id='main'>{props.children}</section>
      <Footer />
    </Fragment>
  );
};

export default Layout;
