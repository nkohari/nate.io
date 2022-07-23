import { MetadataPluginProps } from '../../types';
import { findNode, getRawText } from '../../util';

export function getExcerpt({ ast }: MetadataPluginProps) {
  const firstParagraph = findNode(ast, (node) => node.type === 'paragraph');

  if (firstParagraph) {
    return { excerpt: getRawText(firstParagraph) };
  }
}
