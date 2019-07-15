import React from 'react';
import { graphql } from 'gatsby';
import { Header, PostList } from '../components';

const BlogIndex = props => {
  const site = props.data.site;
  const posts = props.data.allMarkdownRemark.edges.map(edge => edge.node).filter(post => !post.frontmatter.draft);
  return (
    <div>
      <Header site={site} />
      <PostList posts={posts} />
    </div>
  );
};

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
            draft
          }
        }
      }
    }
  }
`;
