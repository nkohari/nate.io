import { MetadataPluginProps } from '../../types';
import { findAllNodes, getRawText } from '../../util';
import { ArticleSection } from '../../../src/types';

export function getSections({ ast }: MetadataPluginProps) {
  const nodes = findAllNodes(ast, (node) => node.type === 'heading');

  const sections: ArticleSection[] = nodes.map((node) => {
    const text = getRawText(node);
    const level = node.attributes.level;
    const id = node.attributes.id;
    return { id, level, text };
  });

  return { sections };
}
