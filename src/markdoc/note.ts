import Markdoc, {Node, Tag} from '@markdoc/markdoc';
import {MarkdocDeclaration} from '@nkohari/apocrypha';
import {MarkdocConfig} from 'build/types';

export const note: MarkdocDeclaration = {
  tag: 'note',
  render: 'Note',
  attributes: {
    id: {type: String},
  },
  transform(node: Node, config: MarkdocConfig) {
    const attributes = node.transformAttributes(config);

    let children = node.transformChildren(config);
    if (children[0] && Tag.isTag(children[0])) {
      children = children[0].children;
    }

    return new Markdoc.Tag(this.render, attributes, children);
  },
};