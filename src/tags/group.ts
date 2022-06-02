import Markdoc, { Config, Node, RenderableTreeNode } from '@markdoc/markdoc';
import { paragraph } from './paragraph';

export const group = {
  render: 'Group',
  attributes: {
    orientation: { type: String, matches: ['horizontal', 'vertical'] },
    spacing: { type: Number },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    let items: RenderableTreeNode[] = [];
    for (const child of children) {
      if (child && typeof child === 'object' && child.name === paragraph.render) {
        // Since group is treated as a block-level tag, its children will be wrapped in a paragraph.
        // Instead, we want to flatten the children and pass them to the Group component directly.
        items = [...items, ...child.children];
      } else {
        items.push(child);
      }
    }

    return new Markdoc.Tag(this.render, attributes, items);
  },
};
