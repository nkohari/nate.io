import Markdoc, { Config, Node } from '@markdoc/markdoc';

export const note = {
  render: 'Note',
  attributes: {
    id: { type: String },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);

    let children = node.transformChildren(config);
    if (children[0] && typeof children[0] === 'object') {
      children = children[0].children;
    }

    return new Markdoc.Tag(this.render, attributes, children);
  },
};
