import React from 'react';
import moment from 'moment';
import Header from '../components/header';
import '../css/post.styl';

class PostTemplate extends React.Component {

  render() {
    const { data } = this.props;
    const article = data.markdownRemark;
    const { title, subtitle, date, category } = article.frontmatter;
    const time = moment(date);
    const readingTime = `${article.timeToRead} minute${article.timeToRead === 1 ? '' : 's'}`;

    return (
      <div className='main'>
        <Header site={data.site} article={article} />
        <article className='post'>
          <header>
            <div className='byline'>
              {category && <span className='category'>On: {category}</span>}
              <time dateTime={time.toISOString()}>{time.format('MMMM D, YYYY')}</time>
              <span className='reading-time'>About {readingTime} to read</span>
            </div>
            <h1>{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
          </header>
          <section className='content' dangerouslySetInnerHTML={{ __html: article.html }} />
        </article>
      </div>
    );
  }
}

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        subtitle
        date
        category
      }
    }
  }
`
