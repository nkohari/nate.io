import { Node } from '@markdoc/markdoc';
import { NodeReducer } from './types';

export function reduceTree<T>(node: Node, reducer: NodeReducer<T>, input: T) {
  let current = reducer(input, node);

  for (const child of node.children) {
    current = reduceTree(child, reducer, current);
  }

  return current;
}
