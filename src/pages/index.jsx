import React from 'react';
import Link from 'gatsby-link'
import Header from '../components/header';
import PostList from '../components/post-list';

class BlogIndex extends React.Component {

  render() {
    const { site, allMarkdownRemark } = this.props.data;
    return (
      <div>
        <Header site={site} />
        <PostList posts={allMarkdownRemark.edges} />
      </div>
    );
  }

}

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { template: { ne: "page" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
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
`
