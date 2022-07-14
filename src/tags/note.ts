import Markdoc, { Node } from '@markdoc/markdoc';
import { MarkdocTransformConfig } from 'src/types';

export default {
  tag: 'note',
  render: 'Note',
  attributes: {
    id: { type: String },
  },
  transform(node: Node, config: MarkdocTransformConfig) {
    const attributes = node.transformAttributes(config);

    let children = node.transformChildren(config);
    if (children[0] && typeof children[0] === 'object') {
      children = children[0].children;
    }

    return new Markdoc.Tag(this.render, attributes, children);
  },
};
