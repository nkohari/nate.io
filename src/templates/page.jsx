import React from 'react';
import moment from 'moment';
import Header from '../components/header';
import '../css/page.styl';

class PageTemplate extends React.Component {

  render() {
    const { data } = this.props;
    const article = data.markdownRemark;
    const { title, subtitle } = article.frontmatter;

    return (
      <div className='main'>
        <Header site={data.site} article={article} />
        <article className='page'>
          <section className='content' dangerouslySetInnerHTML={{ __html: article.html }} />
        </article>
      </div>
    );
  }
}

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
`
