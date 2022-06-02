import { Node } from '@markdoc/markdoc';
import { NodePredicate } from './types';

export function findNode(node: Node, predicate: NodePredicate) {
  if (predicate(node)) {
    return node;
  }

  for (const child of node.children) {
    let result = findNode(child, predicate);
    if (result) {
      return result;
    }
  }

  return null;
}
