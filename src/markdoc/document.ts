import Markdoc, {Node} from '@markdoc/markdoc';
import {MarkdocDeclaration} from '@nkohari/apocrypha';
import {MarkdocConfig} from 'build/types';

export const document: MarkdocDeclaration = {
  node: 'document',
  render: 'Document',
  transform(node: Node, config: MarkdocConfig) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    return new Markdoc.Tag(this.render, {type: config.metadata.type, ...attributes}, children);
  },
};
