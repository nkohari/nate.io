import Markdoc, { Node } from '@markdoc/markdoc';
import { MarkdocTransformConfig } from 'src/types';

export default {
  node: 'document',
  render: 'Document',
  transform(node: Node, config: MarkdocTransformConfig) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    return new Markdoc.Tag(this.render, { type: config.metadata.type, ...attributes }, children);
  },
};
