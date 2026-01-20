import { Tag } from '@markdoc/markdoc';
import { MarkdocDeclaration } from 'build/types';

export const video: MarkdocDeclaration = {
  tag: 'video',
  render: 'Video',
  attributes: {
    src: { type: String },
    height: { type: Number },
    width: { type: Number },
    play: { type: String, matches: ['auto', 'hover'] },
    corners: { type: String, matches: ['sm', 'md', 'lg', 'xl', 'full'] },
  },
  transform(node, config) {
    const children = node.transformChildren(config);

    let attributes = node.transformAttributes(config);
    if (config.metadata.videos) {
      const metadata = config.metadata.videos.find((vid) => vid.src === attributes.src);
      if (metadata) {
        attributes = { ...attributes, metadata };
      }
    }

    return new Tag(this.render, attributes, children);
  },
};
