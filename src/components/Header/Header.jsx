import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import { Nav } from '../Nav/Nav';
import './Header.styl';

export const Header = props => {
  const { site, article } = props;
  const title = article ? article.frontmatter.title : site.siteMetadata.title;
  return (
    <header className="site-header">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Link to="/" className="logo">
        <span>Discord</span>
        <span className="amp">&</span>
        <span>Rhyme</span>
      </Link>
      {article && <Nav site={site} article={article} />}
    </header>
  );
};
