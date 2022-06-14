import { Node } from '@markdoc/markdoc';
import { NodePredicate } from '../types';
import { reduceTree } from './reduceTree';

export function findAllNodes(node: Node, predicate: NodePredicate) {
  return reduceTree(
    node,
    (matches, node) => {
      if (predicate(node)) matches.push(node);
      return matches;
    },
    [] as Node[]
  );
}
