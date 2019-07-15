import React from 'react';
import Footer from '../components/Footer';
import '../css/base.styl';

const Layout = props => {
  <div className="layout">
    {props.children()}
    <Footer />
  </div>;
};

export default Layout;
