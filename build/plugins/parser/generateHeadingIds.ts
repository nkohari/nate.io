import { ParserPluginProps } from '../../types';
import { findAllNodes, getRawText } from '../../util';

const createAutomaticId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

export function generateHeadingIds({ ast }: ParserPluginProps) {
  const nodes = findAllNodes(ast, (node) => node.type === 'heading');

  for (const node of nodes) {
    if (!node.attributes.id) {
      const text = getRawText(node);
      node.attributes.id = createAutomaticId(text);
    }
  }

  return ast;
}
