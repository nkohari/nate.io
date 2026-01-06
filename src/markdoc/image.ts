import { Tag } from '@markdoc/markdoc';
import { MarkdocDeclaration } from 'build/types';

export const image: MarkdocDeclaration = {
  node: 'image',
  tag: 'image',
  render: 'Image',
  attributes: {
    alt: { type: String },
    corners: { type: String, matches: ['sm', 'md', 'lg', 'xl', 'full'] },
    filter: { type: String, matches: ['grayscale', 'sepia'] },
    src: { type: String },
  },
  transform(node, config) {
    const children = node.transformChildren(config);

    let attributes = node.transformAttributes(config);
    if (config.metadata.images) {
      const metadata = config.metadata.images.find((img) => img.src === attributes.src);
      if (metadata) {
        attributes = { ...attributes, metadata };
      }
    }

    return new Tag(this.render, attributes, children);
  },
};
