import React from 'react';
import Footer from '../components/footer';
import '../css/base.styl';

class Layout extends React.Component {

  render() {
    const { children } = this.props;
    return (
      <div className='layout'>
        {children()}
        <Footer />
      </div>
    );
  }
}

export default Layout;
