import imageSize from 'image-size';
import Markdoc, { Config, Node } from '@markdoc/markdoc';

export default {
  node: 'image',
  tag: 'image',
  render: 'Image',
  attributes: {
    src: { type: String },
    alt: { type: String },
    circle: { type: Boolean },
    filter: { type: String, matches: ['grayscale', 'sepia'] },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const { height, width, type: format } = imageSize(`media/images/${attributes.src}`);

    return new Markdoc.Tag(this.render, { height, width, format, ...attributes }, children);
  },
};
