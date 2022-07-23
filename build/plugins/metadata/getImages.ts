import { MetadataPluginProps } from '../../types';
import { findAllNodes } from '../../util';

export function getImages({ ast }: MetadataPluginProps) {
  const images = findAllNodes(ast, (node) => node.tag === 'image').map(
    (node) => node.attributes.src
  );

  const heroImage = images.find((im) => im.id === 'hero');

  if (images.length > 0) {
    return { heroImage, images };
  }
}
