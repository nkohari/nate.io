import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Nav from './nav';
import '../css/header.styl';

class Header extends React.Component {

  render() {
    const { site, article } = this.props;
    const title = article ? article.frontmatter.title : site.siteMetadata.title;
    return (
      <header className='site-header'>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Link to='/' className='logo'>
          <span>Discord</span><span className='amp'>&</span><span>Rhyme</span>
        </Link>
        <Nav site={site} article={article} />
      </header>
    );
  }
}

export default Header;
