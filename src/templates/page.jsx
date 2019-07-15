import React from 'react';
import { graphql } from 'gatsby';
import { Header } from '../components';
import '../css/page.styl';

const PageTemplate = props => {
  const site = props.data.site;
  const article = props.data.markdownRemark;
  return (
    <div className="main">
      <Header site={site} article={article} />
      <article className="page">
        <section className="content" dangerouslySetInnerHTML={{ __html: article.html }} />
      </article>
    </div>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;
