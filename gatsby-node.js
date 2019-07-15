const { parse, resolve } = require('path');

const getSlug = fileNode => {
  const { dir, name } = parse(fileNode.relativePath);
  if (dir !== '' && name !== 'index') {
    return `/${dir}/${name}`;
  } else if (dir === '') {
    return `/${name}`;
  } else {
    return `/${dir}`;
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    createNodeField({ node, name: 'slug', value: getSlug(fileNode) });
  }
};

const allPostsQuery = `{
  allMarkdownRemark(limit: 1000) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          template
        }
      }
    }
  }
}`;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(allPostsQuery).then(result => {
    if (result.errors) {
      throw new Error('Errors loading nodes: ' + result.errors);
    }
    const { edges } = result.data.allMarkdownRemark;
    edges.forEach(edge => {
      const { node } = edge;
      const { slug } = node.fields;
      const template = node.frontmatter.template || 'post';
      createPage({
        path: slug,
        component: resolve(__dirname, `./src/templates/${template}.jsx`),
        context: { slug }
      });
    });
  });
};
