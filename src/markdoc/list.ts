import {Tag} from '@markdoc/markdoc';
import {MarkdocDeclaration} from 'build/types';

export const listNode: MarkdocDeclaration = {
  node: 'list',
  render: 'List',
  attributes: {
    ordered: {type: Boolean},
  },
};

export const listTag: MarkdocDeclaration = {
  tag: 'list',
  render: 'List',
  attributes: {
    compact: {type: Boolean},
    ordered: {type: Boolean},
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    const items = [];
    for (const child of children) {
      if (Tag.isTag(child) && child.name === this.render) {
        items.push(...child.children);
      }
    }

    return new Tag(this.render, attributes, items);
  },
};
