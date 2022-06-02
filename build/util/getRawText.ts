import { Node } from '@markdoc/markdoc';
import { reduceTree } from './reduceTree';

export function getRawText(ast: Node): string {
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
