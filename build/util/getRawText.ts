import { Node } from '@markdoc/markdoc';
import { reduceTree } from './reduceTree';

export function getRawText(ast: Node): string {
  // TODO: This is a reasonable approximation but too naive. In particular,
  // it leaves extra whitespace around the text contained in inline elements
  // (bold, italics, etc.)
  const content = reduceTree(
    ast,
    (strings: string[], node: Node) => {
      if (node.type === 'text') {
        strings.push(node.attributes.content);
      }
      return strings;
    },
    []
  );

  return content.join(' ');
}
