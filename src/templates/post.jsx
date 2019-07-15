import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';
import { Header, SpotifyWidget, RelatedPosts } from '../components';
import '../css/post.styl';

const PostTemplate = props => {
  const { article, site, allMarkdownRemark } = props.data;
  const { title, subtitle, date, category, song, related } = article.frontmatter;

  const time = moment(date);
  const readingTime = `${article.timeToRead} minute${article.timeToRead === 1 ? '' : 's'}`;

  let spotify;
  if (song) {
    spotify = <SpotifyWidget song={song} />;
  }

  let relatedPosts;
  if (related) {
    const posts = related.map(slug => {
      const edge = allMarkdownRemark.edges.find(edge => edge.node.fields.slug === slug);
      if (!edge) {
        throw new Error(`Couldn't resolve related post with slug ${slug}`);
      }
      return edge.node;
    });
    relatedPosts = <RelatedPosts posts={posts} />;
  }

  return (
    <div className="main">
      <Header site={site} article={article} />
      <article className="post">
        <header className="post-header">
          <div className="byline">
            {category && <span className="category">On: {category}</span>}
            <time dateTime={time.toISOString()}>{time.format('MMMM D, YYYY')}</time>
            <span className="reading-time">About {readingTime} to read</span>
          </div>
          <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}
        </header>
        <main>
          <section className="content" dangerouslySetInnerHTML={{ __html: article.html }} />
          <aside>
            {spotify}
            {relatedPosts}
          </aside>
        </main>
      </article>
    </div>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        subtitle
        date
        category
        song
        related
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            date
          }
        }
      }
    }
  }
`;
