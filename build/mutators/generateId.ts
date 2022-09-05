import { NodeMutatorProps } from '../types';
import { getRawText } from '../util';

export function generateId({ node }: NodeMutatorProps) {
  if (!node.attributes.id) {
    node.attributes.id = getRawText(node)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
}
