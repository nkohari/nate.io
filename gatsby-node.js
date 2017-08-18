const { parse, resolve } = require('path');

const loadPosts = graphql => graphql(`{
  entries: allMarkdownRemark(limit: 1000) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          tags
          template
        }
      }
    }
  }
}`);

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

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    createNodeField({ node, name: 'slug', value: getSlug(fileNode) });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return loadPosts(graphql).then(result => {
    if (result.errors) {
      throw new Error('Errors loading nodes: ' + result.errors);
    }
    const items = result.data.entries.edges;
    items.forEach(item => {
      const { slug } = item.node.fields;
      const template = item.node.frontmatter.template || 'post';
      createPage({
        path: slug,
        component: resolve(__dirname, `./src/templates/${template}.jsx`),
        context: { slug }
      });
    });
  });
};
